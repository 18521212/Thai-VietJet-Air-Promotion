import paymentService from '../services/paymentService';
import { resolveObj, func } from '../utils';

let paymentPromotion = async (req, res) => {
    try {
        let data = await paymentService.paymentPromotion(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

module.exports = {
    paymentPromotion,
}