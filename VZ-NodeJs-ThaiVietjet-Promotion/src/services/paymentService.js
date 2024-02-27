const db = require('../models');
const { resolveObj, func, type, text } = require('../utils');
const axios = require('axios');
import { QueueEmail } from '../class/Email/QueueEmail'

const { XMLParser, XMLValidator } = require('fast-xml-parser');
const optionsXML = {
    ignoreAttributes: false
};
import { Crypto } from '../class/Crypto/Crypto';

let sha512 = (string) => {
    var crypto = require('crypto');
    let encode = crypto.createHash('sha512').update(String(string)).digest('hex')
    return encode
}

let secureHash = (totalPriceInVat, orderId) => {
    let MID = process.env.MID
    let MREF = orderId // order id
    let currencyCode = 764 // THB
    let amount = totalPriceInVat
    let paymentType = 'N' // normal
    let secretKey = process.env.SECRET_KEY
    let string = `${MID}|${MREF}|${currencyCode}|${amount}|${paymentType}|${secretKey}`
    let crypto = new Crypto()
    let encode = crypto.sha512(string)
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
    let orderId = orderRef
    if (orderRef.includes(prefix)) {
        orderId = orderRef.replace(prefix, '')
        orderId = addStrAtIndex(orderId, '-', 20)
        orderId = addStrAtIndex(orderId, '-', 16)
        orderId = addStrAtIndex(orderId, '-', 12)
        orderId = addStrAtIndex(orderId, '-', 8)
        console.log('del pre ord', orderId)
    }
    return orderId
}

let paymentPromotion = (_data) => {
    return new Promise((resolve, reject) => {
        try {
            let orderId = _data?.createdData?.order?.id // data.createdData.id: order.id (order id)
            let prefixOrderId = prefixOrdId(orderId, 'OT-') // length <= 35
            if (!orderId) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            let _secureHash = secureHash(_data.validatePayment.totalPriceInVat, prefixOrderId)

            resolve({
                errCode: 0,
                errMessage: 'Validate  payment success',
                data: {
                    validatePayment: _data.validatePayment,
                    productArr: _data.productArr,
                    secureHash: _secureHash,
                    prefixOrderId: prefixOrderId,
                    orderId: orderId
                }
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createCustomer = (data, _transaction = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!(data.middleGivenName && data.familyName
                && data.passengerMiddleGivenName && data.passengerFamilyName
                && data.email && data.phone)) {
                return resolve(resolveObj.MISSING_PARAMETERS)
            }
            // check duplicate customer infor
            let exist_customer =
                await db.Customer
                    .findOne({
                        where: {
                            middleGivenName: data.middleGivenName,
                            familyName: data.familyName,
                            passengerMiddleGivenName: data.passengerMiddleGivenName,
                            passengerFamilyName: data.passengerFamilyName,
                            email: data.email,
                            phone: data.phone
                        }
                    })
            let _response = ''
            if (!exist_customer) {
                let dataCreate =
                    await db.Customer
                        .create(data, { transaction: _transaction })
                if (dataCreate) {
                    _response = resolveObj.GET(dataCreate)
                } else {
                    _response = resolveObj.CREATE_UNSUCCEED()
                }
            } else {
                _response = resolveObj.GET(exist_customer)
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let createOrder_OrderDetail_Customer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderCreate = {}
            let _transaction_status = false
            try {
                await db.sequelize.transaction(async (t) => {
                    // create customer
                    let customerSent = data.customer
                    let response_customer = await createCustomer(customerSent, t)
                    if (response_customer.errCode != 0) {
                        throw new Error()
                    }
                    let customer = response_customer.data
                    // create order
                    let orderSent = data.order
                    orderCreate =
                        await db.Order
                            .create({
                                customerId: customer.id,
                                totalPriceInVat: orderSent.totalPriceInVat,
                                totalVatFee: orderSent.totalVatFee,
                                payRef: data.payRef,
                                status: 'Draft',
                                emailStatus: 'unsend'
                            }, { transaction: t })
                    // create order detail
                    let orderDetailSent = data.orderDetail
                    for (let i = 0; i < orderDetailSent.length; i++) {
                        let item = orderDetailSent[i]
                        item.orderId = orderCreate.id
                    }
                    let orderDetail_create =
                        await db.Order_Detail
                            .bulkCreate(orderDetailSent, { transaction: t })
                })
                _transaction_status = true
            } catch (e) {
                _transaction_status = false
            }
            let _response = ''
            if (_transaction_status) {
                _response = {
                    errCode: 0,
                    errMessage: text.CREATE_SUCCEED('Order, OrderDetail, Customer'),
                    data: {
                        order: orderCreate
                    }
                }
            } else {
                _response = resolveObj.CREATE_UNSUCCEED('Order, OrderDetail, Customer')
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateStatusOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderRef = data?.orderRef
            let _response = ''
            if (!orderRef) { // data.createdData.id: order.id (order id)
                _response = { ...resolveObj.MISSING_PARAMETERS, datafeedStatus: 1 }
            } else {
                let orderId = delPrefixOrdId(orderRef, 'OT-')
                let order =
                    await db.Order
                        .findByPk(orderId)
                if (!order) {
                    _response = { errCode: 1, errMessage: `Order doesn't exist`, datafeedStatus: 1 }
                } else {
                    if (['Accepted', 'Rejected', 'Cancelled'].includes(order.status)) {
                        _response = {
                            errCode: 0,
                            errMessage: 'Order has been handled',
                            datafeedStatus: 0
                        }
                    } else {
                        let prefixOrderId = orderRef// length <= 35
                        let dataIPAY = await axios.get(process.env.LINK_API, {
                            params: {
                                merchantId: process.env.MID,
                                loginId: process.env.LOGIN_ID,
                                password: process.env.PASSWORD,
                                actionType: 'Query',
                                orderRef: prefixOrderId,
                            }
                        })
                        const parser = new XMLParser(optionsXML);
                        let jsonObj = parser.parse(dataIPAY.data);
                        let orderUpdate
                        if (jsonObj.records.record) {
                            let orderStatus = jsonObj.records.record.orderStatus
                            orderUpdate =
                                await order
                                    .update({
                                        status: orderStatus
                                    })
                            if (orderUpdate) {
                                await order
                                    .reload()
                                let _datafeedStatus = 1
                                if (['Accepted', 'Rejected', 'Cancelled'].includes(orderUpdate.status)) {
                                    _datafeedStatus = 0

                                    // send email
                                    let customer =
                                        await db.Customer
                                            .findOne({ where: { id: order.customerId } })
                                    // opt 1
                                    let _queue = new QueueEmail()
                                    _queue.addEmailToQueue({ receiver: customer.email, ref: orderId, status: orderStatus })
                                    // --< opt 1
                                    // --< send email
                                }
                                _response = {
                                    ...resolveObj.UPDATE_SUCCEED(),
                                    datafeedStatus: _datafeedStatus
                                }
                            } else {
                                _response = {
                                    ...resolveObj.UPDATE_UNSUCCEED(),
                                    datafeedStatus: 1
                                }
                            }
                            if (!order?.payRef) {
                                await order
                                    .update({ payRef: jsonObj.records.record.payRef })
                            }
                        }
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateProcessingOrder = (_data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderRef = _data?.orderRef
            let _response
            if (!orderRef || !_data?.totalPriceInVat) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let prefixOrderId = prefixOrdId(orderRef, 'OT-')
                let token = _data.secureHash
                let encode = secureHash(_data?.totalPriceInVat, prefixOrderId)
                if (encode != token) {
                    _response = { errCode: 1, errMessage: 'unmatch transaction' }
                } else {
                    let order =
                        await db.Order
                            .findOne({ where: { id: orderRef } })
                    if (order) {
                        if (order.status != 'Draft') {
                            _response = { errCode: 0, errMessage: 'Order already processing' }
                        } else {
                            let _order_upate = await order.update({ status: 'Processing' })
                            if (_order_upate) {
                                _response = resolveObj.UPDATE_SUCCEED()
                            } else {
                                _response = resolveObj.UPDATE_UNSUCCEED()
                            }
                        }
                    } else {
                        _response = resolveObj.NOT_FOUND()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let dataFeed = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let successcode = data.successcode
            let update_result
            // secure
            let { src, prc, Ref, payRef, Cur, Amt, payerAuth, secureHash } = data
            let secretKey = process.env.SECRET_KEY
            let string = `${src}|${prc}|${successcode}|${Ref}|${payRef}|${Cur}|${Amt}|${payerAuth}|${secretKey}`
            let encode = sha512(string)
            let _response
            if (encode != secureHash) {
                update_result = await updateStatusOrder({ orderRef: Ref })
                _response = update_result
            } else {
                _response = { errCode: 1, errMessage: 'unmatch transaction', datafeedStatus: 1 }
            }
            resolve(_response)
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
                return resolve(resolveObj.MISSING_PARAMETERS)
            }
            let order =
                await db.Order
                    .findOne({
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

let updateEmailStatus = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // update email status: 'sent' status by default
            let ref = data.ref
            let _response
            if (!ref) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_o = await db.Order.findByPk(ref)
                let _upd_o = await _get_o.update({
                    emailStatus: 'sent'
                })
                if (_upd_o) {
                    _response = resolveObj.UPDATE_SUCCEED()
                } else {
                    _response = resolveObj.UPDATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let monitorOrder = () => {
    const schedule = require('node-schedule');

    let taskRunning = false

    const job = schedule.scheduleJob('*/1 * * * *', async () => {
        if (taskRunning) {
            return
        }
        taskRunning = true
        console.log('monitor at', new Date())
        let orders =
            await db.Order
                .findAll({
                    where:
                    {
                        status: {
                            [db.Sequelize.Op.notIn]: ['Accepted', 'Rejected', 'Cancelled', 'Draft']
                        },
                    },
                    order: [['createdAt', 'DESC']],
                    limit: 5
                })
        console.log(orders.length) // length
        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                await updateStatusOrder({ orderRef: prefixOrdId(orders[i].id, 'OT-') })
            }
        }
        taskRunning = false
    });
}

// TODO: vestigate all cycle import/export
module.exports = {
    paymentPromotion,

    createOrder_OrderDetail_Customer,
    updateStatusOrder,
    updateProcessingOrder,

    dataFeed,
    // getOrder,
    // updateEmailStatus,

    monitorOrder,
}

exports.getOrder = getOrder
exports.updateEmailStatus = updateEmailStatus