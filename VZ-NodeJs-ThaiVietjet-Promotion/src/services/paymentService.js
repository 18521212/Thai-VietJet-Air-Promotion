const db = require('../models');
const { resolveObj, func, type } = require('../utils');
const axios = require('axios');

var crypto = require('crypto');

const { XMLParser, XMLValidator } = require('fast-xml-parser');
const optionsXML = {
    ignoreAttributes: false
};

let secureHash = (totalPriceInVat, orderId) => {
    let MID = process.env.MID
    let MREF = orderId // order id
    let currencyCode = 764 // THB
    let amount = totalPriceInVat // total price included vat
    let paymentType = 'N' // normal
    let secretKey = process.env.SECRET_KEY
    let string = `${MID}|${MREF}|${currencyCode}|${amount}|${paymentType}|${secretKey}`
    let encode = crypto.createHash('sha512').update(String(string)).digest('hex')
    return encode
}

let prefixOrdId = (orderId, prefix = '') => {
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
            console.log('pre ord', prefixOrderId, prefixOrderId.length)

            let encode = secureHash(data.validatePayment.totalPriceInVat, prefixOrderId)
            data.secureHash = encode

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
                    // middleName: customerSent.middleGivenName,
                    // familyName: customerSent.familyName,
                    // passengerMiddleName: customerSent.passengerMiddleGivenName,
                    // passengerFamilyName: customerSent.passengerFamilyName,
                    // email: customerSent.email,
                    // phone: customerSent.phone
                    ...customerSent
                })
                // create order
                let orderSent = data.order
                order = await db.Order.create({
                    customerId: customer.id,
                    totalPriceInVat: orderSent.totalPriceInVat,
                    totalVatFee: orderSent.totalVatFee,
                    payRef: data.payRef,
                    status: 'Pending' // fix status data init
                })
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
                let orderStatus = jsonObj.records.record.orderStatus
                console.log('up sta', orderStatus)
                let orderId = delPrefixOrdId(orderRef, 'OT-')
                let order = await db.Order.findOne({ where: { id: orderId } })
                await order.update({
                    status: orderStatus
                })
            }
            )
            resolve(resolveObj.UPDATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let dataFeed = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await await axios.get('http://localhost:3000/datafeed', {
                // params: {
                //     merchantId: '3082',
                //     loginId: 'VietjetApi',
                //     password: 'Api1234',
                //     actionType: 'Query',
                //     orderRef: prefixOrderId,
                // }
            })
            console.log('data datafeed', data)
            resolve(resolveObj.UPDATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    paymentPromotion,

    createOrder_OrderDetail_Customer,
    updateStatusOrder,

    dataFeed,
}