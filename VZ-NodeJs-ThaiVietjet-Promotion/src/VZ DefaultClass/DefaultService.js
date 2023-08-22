const db = require('../models');

let defaultFunction = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve({
                errCode: 0,
                errMessage: 'Ok'
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    defaultFunction: defaultFunction,
}