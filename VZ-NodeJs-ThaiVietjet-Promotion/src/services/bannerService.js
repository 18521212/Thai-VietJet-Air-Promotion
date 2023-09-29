const db = require('../models');
const { resolveObj } = require('../utils');

// banner

let createBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
            } else {
                await db.Banner.create({
                    name: data.name,
                })

                resolve(resolveObj.CREATE_SUCCEED('Banner'))
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let banner = await db.Banner.findOne({ where: { id: id } })

                await banner.update({
                    name: data.name
                }, { transaction: t })
            })
            resolve(resolveObj.UPDATE_SUCCEED('Banner'))
        } catch (e) {
            reject(e)
        }
    })
}

let getAllBanner = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Banner.findAll({
                include: [
                    { model: db.Image_Banner, as: 'imageData' }
                ]
            })
            data && data.map((item) => {
                if (item.imageData.image) {
                    item.imageData.image = new Buffer(item.imageLogo, 'base64').toString('binary')
                }
            })
            resolve(resolveObj.GET(data))
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
                await db.ImageBanner.destroy({ where: { bannerId: data.id }, transaction: t })
                await db.Banner.destroy({ where: { id: data.id }, transaction: t })
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e)
        }
    })
}

// image banner

let addImageBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.bannerId || !data.image) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let banner = await db.Banner.findOne({ where: { id: data.bannerId } })
                if (!banner) {
                    resolveObj.NOT_FOUND('Banner')
                    throw new Error()
                }
                await db.Image_Banner.create({
                    bannerId: data.bannerId,
                    image: data.image,
                    type: data.type ? data.type : 'mobile'
                }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED('Image Banner'))
        } catch (e) {
            reject(e)
        }
    })
}

let deleteImageBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                await db.Image_Banner.destroy({ where: { id: data.id }, transaction: t })
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createBanner: createBanner,
    getAllBanner: getAllBanner,
    updateBanner: updateBanner,
    deleteBanner: deleteBanner,
    addImageBanner: addImageBanner,
    deleteImageBanner: deleteImageBanner,
}