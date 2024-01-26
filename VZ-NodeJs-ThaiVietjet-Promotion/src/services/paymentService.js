const { waitForDebugger } = require('inspector');
const db = require('../models');
const { resolveObj, func, type } = require('../utils');
const axios = require('axios');

const { XMLParser, XMLValidator } = require('fast-xml-parser');
const optionsXML = {
    ignoreAttributes: false
};

let sha512 = (string) => {
    var crypto = require('crypto');
    let encode = crypto.createHash('sha512').update(String(string)).digest('hex')
    return encode
}

let secureHash = (totalPriceInVat, orderId) => {
    let MID = process.env.MID
    let MREF = orderId // order id
    let currencyCode = 764 // THB
    let amount = totalPriceInVat // total price included vat
    let paymentType = 'N' // normal
    let secretKey = process.env.SECRET_KEY
    let string = `${MID}|${MREF}|${currencyCode}|${amount}|${paymentType}|${secretKey}`
    let encode = sha512(string)
    return encode
}

let prefixOrdId = (orderId, prefix = '') => {
    if (orderId.startsWith(prefix) && orderId.length == 35) {
        return orderId
    }
    let subStrOrderId = orderId.replace(/-/g, '') // remove " - " character
    let prefixOrderId = prefix + subStrOrderId// add prefix
    return prefixOrderId
}

let addStrAtIndex = (str, char, position) => {
    let result
    result = [str.slice(0, position), char, str.slice(position)].join('');
    return result
}

let delPrefixOrdId = (orderRef, prefix = '') => {
    let orderId = orderRef.replace(prefix, '')
    orderId = addStrAtIndex(orderId, '-', 20)
    orderId = addStrAtIndex(orderId, '-', 16)
    orderId = addStrAtIndex(orderId, '-', 12)
    orderId = addStrAtIndex(orderId, '-', 8)
    console.log('del pre ord', orderId)
    return orderId
}

let paymentPromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderId = data?.createdData?.order?.id // data.createdData.id: order.id (order id)
            let prefixOrderId = prefixOrdId(orderId, 'OT-') // length <= 35
            if (!orderId) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            let encode = secureHash(data.validatePayment.totalPriceInVat, prefixOrderId)
            data.secureHash = encode
            console.log('encode:', encode)

            resolve({
                errCode: 0,
                errMessage: 'Validate  payment success',
                data: {
                    validatePayment: data.validatePayment,
                    productArr: data.productArr,
                    secureHash: data.secureHash,
                    prefixOrderId: prefixOrderId,
                    orderId: orderId
                }
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createOrder_OrderDetail_Customer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = {}
            await db.sequelize.transaction(async (t) => {
                // create customer
                let customerSent = data.customer
                let customer = await db.Customer.create({
                    ...customerSent
                })
                // create order
                let orderSent = data.order
                order = await db.Order.create({
                    customerId: customer.id,
                    totalPriceInVat: orderSent.totalPriceInVat,
                    totalVatFee: orderSent.totalVatFee,
                    payRef: data.payRef,
                    status: 'Draft' // fixed status data init
                })
                // monitorOrder()
                // create order detail
                let orderDetailSent = data.orderDetail
                for (let i = 0; i < orderDetailSent.length; i++) {
                    let item = orderDetailSent[i]
                    item.orderId = order.id
                }
                let order_detail = await db.Order_Detail.bulkCreate(orderDetailSent)
            })
            resolve({
                errCode: 0,
                errMessage: 'Create success',
                data: {
                    order: order
                }
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateStatusOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderRef = data?.orderRef
            console.log('ord rf', orderRef)
            if (!orderRef) { // data.createdData.id: order.id (order id)
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            let orderUpdated = false
            await db.sequelize.transaction(async (t) => {
                let link2 = `https://psipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp`
                let linktest = `https://psipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp?merchantId=3082&loginId=VietjetApi&password=Api1234&actionType=Query&orderRef=1`
                let prefixOrderId = orderRef// length <= 35
                let data1 = await axios.get(link2, {
                    params: {
                        merchantId: '3082',
                        loginId: 'VietjetApi',
                        password: 'Api1234',
                        actionType: 'Query',
                        orderRef: prefixOrderId,
                    }
                })
                const parser = new XMLParser(optionsXML);
                let jsonObj = parser.parse(data1.data);
                // console.log('record', data1.data)
                let orderId = delPrefixOrdId(orderRef, 'OT-')
                let order = await db.Order.findOne({ where: { id: orderId } })
                if (jsonObj.records.record) {
                    let orderStatus = jsonObj.records.record.orderStatus
                    console.log('st', orderStatus)
                    if (order) {
                        if (['Accepted', 'Rejected', 'Cancelled'].includes(order.status)) {
                            resolve({
                                errCode: 0,
                                errMessage: 'Order has been handled'
                            })
                            return
                        }
                        orderUpdated = await order.update({
                            status: orderStatus
                        })
                        await order.reload()
                        if (order && ['Accepted', 'Rejected', 'Cancelled'].includes(order.status)) {
                            // send email
                            let customer = await db.Customer.findOne({ where: { id: order.customerId } })
                            console.log('email', customer.email)
                            sendEmail_PaymentStatus(orderId, customer.email, order.status)
                        }
                    }
                    if (!order.payRef) {
                        await order.update({ payRef: jsonObj.records.record.payRef })
                    }
                } else {
                    if (order) {
                        if (order.status == 'Draft' && order.createdAt < new Date(new Date() - 5 * 60 * 1000)) {
                            orderUpdated = await order.update({
                                status: 'Unpaid'
                            })
                        }
                    }
                }
            }
            )
            if (orderUpdated) {
                resolve(resolveObj.UPDATE_SUCCEED())
            } else {
                resolve(resolveObj.UPDATE_UNSUCCEED())
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateProcessingOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderRef = data?.orderRef
            if (!orderRef || !data?.totalPriceInVat) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            let prefixOrderId = prefixOrdId(orderRef, 'OT-')
            let token = data.secureHash
            let encode = secureHash(data?.totalPriceInVat, prefixOrderId)
            await db.sequelize.transaction(async (t) => {
                if (encode != token) {
                    resolve({ errCode: 1, errMessage: 'unmatch transaction' })
                    throw new Error()
                }
                let order = await db.Order.findOne({ where: { id: orderRef } })
                if (order.status != 'Draft' && order.status != 'Unpaid') {
                    resolve({ errCode: 0, errMessage: 'Order already processing' })
                    throw new Error()
                }
                if (order) {
                    await order.update({ status: 'Processing' })
                    resolve(resolveObj.UPDATE_SUCCEED())
                } else {
                    resolve(resolveObj.NOT_FOUND())
                }
                return
            })
        } catch (e) {
            reject(e)
        }
    })
}

let dataFeed = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let successcode = data.successcode
            let updateResult
            if (successcode == 0) {
                // secure
                let { src, prc, Ref, payRef, Cur, Amt, payerAuth, secureHash } = data
                let secretKey = process.env.SECRET_KEY
                let string = `${src}|${prc}|${successcode}|${Ref}|${payRef}|${Cur}|${Amt}|${payerAuth}|${secretKey}`
                let encode = sha512(string)
                console.log('ver', encode)
                console.log('seHas', secureHash)
                if (encode == secureHash) {
                    updateResult = await updateStatusOrder({ orderRef: Ref })
                } else {
                    // unmatch transaction
                    resolve({ errCode: 1, errMessage: 'unmatch transaction' })
                    return
                }
            } else {
                // transaction reject
                resolve({ errCode: 1, errMessage: 'transaction reject' })
                return
            }
            if (updateResult && updateResult.errCode == 0) {
                resolve(updateResult)
            } else {
                resolve(resolveObj.UPDATE_UNSUCCEED())
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getOrder = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ref = data?.ref // prefixed
            if (!ref) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await updateStatusOrder({ orderRef: ref })
            let order = await db.Order.findOne({
                where: { id: delPrefixOrdId(ref, 'OT-') },
                attributes: {
                    exclude: ['customerId']
                }
            })
            resolve(resolveObj.GET(order))
        } catch (e) {
            reject(e)
        }
    })
}

let emailAPIlink = (ref) => `
Hello customer, the link below is using for query your order status
<a href='http://localhost:3000/payment/invoice/${ref}'>checking your order status</a>

Thanks
`

let emailPaymentStatus = (ref, status) => `
    Thai Vietjet Promotion

    <br/>
    <br/>
    Hello customer,
    <br/>
    Your Order Id: ${ref}
    <br/>
    Order Status: ${status}
`

let sendEmail_PaymentStatus = async (ref, email, status) => {
    if (!ref || !email || !status) {
        return false
    }
    // ref = prefixOrdId(ref, 'OT-')
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        },
    });
    const info = await transporter.sendMail({
        from: '"Thai Vietjet Promotion" <tranxuannhonpublic@gmail.com>',
        to: email,
        subject: "Payment Result", // Subject line
        html: emailPaymentStatus(ref, status), // html body
    });
}

let sendEmail = async (ref, email) => {
    if (!ref || !email) {
        return false
    }
    ref = prefixOrdId(ref, 'OT-')
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        },
    });
    const info = await transporter.sendMail({
        from: '"Thai Vietjet Promotion" <tranxuannhonpublic@gmail.com>',
        to: email,
        subject: "Checking your order status", // Subject line
        html: emailAPIlink(ref), // html body
    });

    console.log("Message sent: %s", info.messageId);
}

let monitorOrder = () => {
    const schedule = require('node-schedule');

    let taskRunning = false

    const job = schedule.scheduleJob('*/5 * * * *', async () => {
        if (taskRunning) {
            return
        }
        taskRunning = true
        console.log('monitor at', new Date())
        let orders = await db.Order.findAll({
            where:
            {
                [db.Sequelize.Op.and]: {
                    status: {
                        [db.Sequelize.Op.notIn]: ['Accepted', 'Rejected', 'Cancelled', 'Unpaid']
                    },
                },
            }
        })
        console.log(orders.length) // length
        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                updateStatusOrder({ orderRef: prefixOrdId(orders[i].id, 'OT-') })
            }
        } else if (orders.length === 0) {
            // job.cancel()
        }
        taskRunning = false
    });
}

module.exports = {
    paymentPromotion,

    createOrder_OrderDetail_Customer,
    updateStatusOrder,
    updateProcessingOrder,

    dataFeed,
    getOrder,
    sendEmail,

    monitorOrder,
}