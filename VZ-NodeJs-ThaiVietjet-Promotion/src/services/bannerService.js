const db = require('../models');
const { resolveObj, func } = require('../utils');

// banner

let createBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageDesktop) {
                resolve(resolveObj.MISSING_PARAMETERS)
            } else {
                await db.Banner.create({
                    name: data.name,
                    imageMobile: data.imageMobile,
                    imageDesktop: data.imageDesktop
                })
                resolve(resolveObj.CREATE_SUCCEED('Banner'))
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllBanner = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Banner.findAll()
            data && data.map((item) => {
                if (item.imageMobile) item.imageMobile = new Buffer(item.imageMobile, 'base64').toString('binary')
                if (item.imageDesktop) item.imageDesktop = new Buffer(item.imageDesktop, 'base64').toString('binary')
            })
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e)
        }
    })
}

let getBannerById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Banner.findOne({ where: { id: id } })
            if (data) {
                item.imageMobile = new Buffer(item.imageLogo, 'base64').toString('binary')
                item.imageDesktop = new Buffer(item.imageLogo, 'base64').toString('binary')
            }
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e)
        }
    })
}

let updateBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !(data.name || data.imageMobile || data.imageDesktop)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let banner = await db.Banner.findOne({ where: { id: data.id } })

                await banner.update({
                    name: data.name,
                    imageMobile: data.imageMobile,
                    imageDesktop: data.imageDesktop
                }, { transaction: t })
            })
            resolve(resolveObj.UPDATE_SUCCEED('Banner'))
        } catch (e) {
            reject(e)
        }
    })
}

let deleteBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }

            await db.sequelize.transaction(async (t) => {
                await db.Banner.destroy({ where: { id: data.id }, transaction: t })
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createBanner,
    getAllBanner,
    getBannerById,
    updateBanner,
    deleteBanner,
}