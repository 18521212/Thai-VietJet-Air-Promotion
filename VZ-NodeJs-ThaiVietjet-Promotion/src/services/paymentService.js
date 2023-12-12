const db = require('../models');
const { resolveObj, func, type } = require('../utils');
const axios = require('axios');

const { XMLParser, XMLValidator } = require('fast-xml-parser');
const optionsXML = {
    ignoreAttributes: false
};

let paymentPromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let link2 = `https://psipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp`
            let linktest = `https://psipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp?merchantId=3082&loginId=VietjetApi&password=Api1234&actionType=Query&orderRef=1`
            let data1 = await axios.get(link2, {
                params: {
                    merchantId: '3082',
                    loginId: 'VietjetApi',
                    password: 'Api1234',
                    actionType: 'Query',
                    orderRef: '1',
                }
            })
            const parser = new XMLParser(optionsXML);
            let jsonObj = parser.parse(data1.data);
            // 1597160
            let paymenti = jsonObj.records.record.find(item => item.payRef == 1597160)
            // console.log('mer', jsonObj.records.record, 'find', paymenti)
            resolve({
                errCode: 0,
                errMessage: 'Validate  payment success',
                data: {
                    validatePayment: data.validatePayment,
                    productArr: data.productArr,
                    secureHash: data.secureHash,
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
            await db.sequelize.transaction(async (t) => {
                // create customer
                let customerSent = data.customer
                let customer = await db.Customer.create({
                    middleName: customerSent.middleName,
                    familyName: customerSent.familyName,
                    passengerMiddleName: customerSent.passengerMiddleName,
                    passengerFamilyName: customerSent.passengerFamilyName,
                    email: customerSent.email,
                    phone: customerSent.phone
                })
                // create order
                let paymentSent = data.payment
                let order = await db.Order.create({
                    customerId: customer.id,
                    totalPriceInVat: paymentSent.totalPriceInVat,
                    totalVatFee: paymentSent.totalVatFee,
                    payRef: data.payRef,
                    status: '-1'
                })
                // create order detail
                let detailPaymentArr = data.detailPayment
                for (let i = 0; i < detailPaymentArr.length; i++) {
                    let item = detailPaymentArr[i]
                    item.orderId = order.id
                }
                let order_detail = await db.Order_Detail.bulkCreate(detailPaymentArr)
            })
            resolve(resolveObj.CREATE_SUCCEED('Order, Order_Detail, Customer'))
        } catch (e) {
            reject(e);
        }
    })
}

let createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.sequelize.transaction(async (t) => {
                let customerSent = data.customer
                let customer = await db.Customer.create({
                    middleName: customerSent.middleName,
                    familyName: customerSent.familyName,
                    passengerMiddleName: customerSent.passengerMiddleName,
                    passengerFamilyName: customerSent.passengerFamilyName,
                    email: customerSent.email,
                    phone: customerSent.phone
                })
                let paymentSent = data.payment
                let order = await db.Order.create({
                    customerId: customer.id,
                    totalPriceInVat: paymentSent.totalPriceInVat,
                    totalVatFee: paymentSent.totalVatFee,
                    payRef: data.payRef,
                    status: '-1'
                })
            })
            resolve(resolveObj.CREATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let createOrderDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data || data.length === 0) {
                resolve(resolveObj.MISSING_PARAMETERS)
            }
            await db.sequelize.transaction(async (t) => {
                let order_details = await db.Order_Detail.bulkCreate(data)
            })
            resolve(resolveObj.CREATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let updateStatusOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.orderId) {
                resolve(resolveObj.MISSING_PARAMETERS)
            }
            await db.sequelize.transaction(async (t) => {
                let link2 = `https://psipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp`
                let linktest = `https://psipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp?merchantId=3082&loginId=VietjetApi&password=Api1234&actionType=Query&orderRef=1`
                let data1 = await axios.get(link2, {
                    params: {
                        merchantId: '3082',
                        loginId: 'VietjetApi',
                        password: 'Api1234',
                        actionType: 'Query',
                        orderRef: '1',
                    }
                })
                const parser = new XMLParser(optionsXML);
                let jsonObj = parser.parse(data1.data);
                console.log('mer', jsonObj.records)
                // call api with axios merchant API
                let data = await axios.get('https://psipay.bangkokbank.com/b2c/eng/merchant/api/orderApi.jsp', {
                    merchantId: '3082',
                    loginId: 'VietjetApi',
                    password: 'Api1234',
                    actionType: 'Query',
                    orderRef: '1',
                })
            }
            )
            resolve(resolveObj.UPDATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    paymentPromotion,

    createOrder_OrderDetail_Customer,
    createOrder,
}