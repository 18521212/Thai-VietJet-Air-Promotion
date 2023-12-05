const db = require('../models');
const { resolveObj, func, type } = require('../utils');

let paymentPromotion = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve({
                errCode: 0,
                errMessage: 'Sent payment success'
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    paymentPromotion,
}