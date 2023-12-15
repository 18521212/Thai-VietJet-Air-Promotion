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

let reconfigKeyOrderDetail = (products, unitPrices) => {
    // products: { 'pack4-1': 1, 't-2': 0 }
    let keyArr = Object.getOwnPropertyNames(products)
    let reconfigProducts = []
    for (let i = 0; i < keyArr.length; i++) {
        let product = {}
        let number = products[keyArr[i]]
        if (number > 0) {
            let productId = getId(keyArr[i])
            product.productId = productId
            product.number = number
            product.unitPrice = unitPrices[productId]

            reconfigProducts.push(product)
        }
    }
    return reconfigProducts
}

let paymentPromotion = async (req, res) => {
    try {
        let reconfigData = {}
        let payment = req.body.payment
        let reconfigCustomer = reconfigKeyCustomer(payment.customer)
        let reconfigPrice = reconfigKeyPrice(payment.price)
        let reconfigOrderDetail = reconfigKeyOrderDetail(payment.pack, payment.unitPricesPack)
        console.log('reconf pr', reconfigPrice)
        reconfigData = {
            customer: reconfigCustomer,
            order: reconfigPrice,
            orderDetail: reconfigOrderDetail
        }
        let dataCreate = await paymentService.createOrder_OrderDetail_Customer(reconfigData); // create order, order detail, customer
        if (dataCreate.errCode != 0) {
            return res.status(200).json(resolveObj.CREATE_UNSUCCEED('Order, Order_Detail, Customer'))
        }
        res.createdData = {
            order: dataCreate.data.order
        }
        console.log('res', dataCreate.data.order.id, 'len', dataCreate.data.order.id.length)
        let data = await paymentService.paymentPromotion(res);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let updateStatusOrder = async (req, res) => {
    try {
        console.log('controller upd pay status')
        let data = await paymentService.updateStatusOrder({ orderRef: req.body.orderRef })
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

module.exports = {
    paymentPromotion,
    updateStatusOrder,
}