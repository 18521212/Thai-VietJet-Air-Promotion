import paymentService from '../services/paymentService';
import { resolveObj, func } from '../utils';

let getKey = (string) => {
    let key = string.split('-', 2)[0]
    return key
}

let getId = (string) => {
    let id = string.split('-', 2)[1]
    return id
}

let reconfigKeyCustomer = (customer) => {
    let keyArrCustomer = Object.getOwnPropertyNames(customer)
    let reconfigCustomer = {}
    for (let i = 0; i < keyArrCustomer.length; i++) {
        reconfigCustomer[getKey(keyArrCustomer[i])] = customer[keyArrCustomer[i]]
    }
    return reconfigCustomer
}

let reconfigKeyPrice = (price) => {
    let reconfigPrice = {}
    reconfigPrice.totalPriceInVat = price.total
    reconfigPrice.totalVatFee = price.vat
    return reconfigPrice
}

let reconfigKeyOrderDetail = (products, unitPrices, vats) => {
    // products: { 'pack4-1': 1, 't-2': 0 }
    let keyArr = Object.getOwnPropertyNames(products)
    let reconfigProducts = []
    for (let i = 0; i < keyArr.length; i++) {
        let product = {}
        let quantity = products[keyArr[i]]
        if (quantity > 0) {
            let productId = getId(keyArr[i])
            product.productId = productId
            product.quantity = quantity
            product.unitPrice = unitPrices[productId]
            product.vat = vats[productId]
            reconfigProducts.push(product)
        }
    }
    return reconfigProducts
}

let paymentPromotion = async (req, res, next) => {
    try {
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await delay(10000) /// waiting 1 second.
        let reconfigData = {}
        let payment = req.body.payment
        let reconfigCustomer = reconfigKeyCustomer(payment.customer)
        let reconfigPrice = reconfigKeyPrice(payment.price)
        let reconfigOrderDetail = reconfigKeyOrderDetail(payment.pack, payment.unitPricesPack, payment.vatPack)
        reconfigData = {
            customer: reconfigCustomer,
            order: reconfigPrice,
            orderDetail: reconfigOrderDetail
        }
        let dataCreate = await paymentService.createOrder_OrderDetail_Customer(reconfigData);
        if (dataCreate.errCode != 0) {
            return res.status(200).json(resolveObj.CREATE_UNSUCCEED('Order, Order_Detail, Customer'))
        }
        res.createdData = {
            order: dataCreate.data.order
        }
        console.log('res', dataCreate.data.order.id, 'len', dataCreate.data.order.id.length)
        let data = await paymentService.paymentPromotion(res);
        // send email
        data.data.customer = reconfigCustomer
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let updateStatusOrder = async (req, res, next) => {
    try {
        let data = await paymentService.updateStatusOrder({ orderRef: req.body.orderRef })
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let updateProcessingOrder = async (req, res, next) => {
    try {
        let data = await paymentService.updateProcessingOrder(req.body)
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let dataFeed = async (req, res, next) => {
    try {
        let data = await paymentService.dataFeed(req.body)
        let responseData = data.datafeedStatus == 0 ? 'OK' : ''
        res.data = responseData
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getOrder = async (req, res, next) => {
    try {
        let data = await paymentService.getOrder(req.params)
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

module.exports = {
    paymentPromotion,
    updateStatusOrder,
    updateProcessingOrder,

    dataFeed,
    getOrder,
}