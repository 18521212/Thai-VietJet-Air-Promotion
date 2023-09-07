const db = require('../models');

let createBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.image || !data.name || !data.type) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                await db.Banner.create({
                    name: data.name,
                    image: data.image,
                    type: data.type
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create new Banner succeed'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllBanner = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Banner.findAll({

            });
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createBanner: createBanner,
    getAllBanner: getAllBanner,
}