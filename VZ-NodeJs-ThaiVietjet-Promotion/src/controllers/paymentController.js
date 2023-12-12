import paymentService from '../services/paymentService';
import { resolveObj, func } from '../utils';

let paymentPromotion = async (req, res) => {
    try {
        // let dataCreate = await paymentService.createOrder_OrderDetail_Customer('data'); // create order, order detail, customer
        // if (dataCreate.errCode != 0) {
        //     return res.status(200).json(resolveObj.CREATE_UNSUCCEED('Order, Order_Detail, Customer'))
        // }
        let data = await paymentService.paymentPromotion(res);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

module.exports = {
    paymentPromotion,
}