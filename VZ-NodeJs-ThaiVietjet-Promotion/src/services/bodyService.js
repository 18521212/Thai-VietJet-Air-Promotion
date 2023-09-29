const db = require('../models');
const { resolveObj } = require('../utils');

let getAllContentBody = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Content_Body.findAll()
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e);
        }
    })
}

let getContentBodyById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Content_Body.findOne({
                    where: {
                        id: id
                    }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllContentBody: getAllContentBody,
    getContentBodyById: getContentBodyById,
}