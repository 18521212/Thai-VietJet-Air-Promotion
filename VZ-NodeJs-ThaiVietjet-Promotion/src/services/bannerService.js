const db = require('../models');
const { resolveObj, func, association } = require('../utils');
import isBase64 from 'is-base64'

// banner

let createBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
            } else {
                await db.sequelize.transaction(async (t) => {
                    await db.Banner.create({
                        name: data.name,
                    })
                })
                resolve(resolveObj.CREATE_SUCCEED('Banner'))
            }
        } catch (e) {
            reject(e);
        }
    })
}

let decodeImageBanner = (imageBanner) => {
    if (imageBanner.image) imageBanner.image = func.DECODE_IMAGE(imageBanner.image)
}

let getBanner = (id) => {
    let imageBanner = association.BANNER_IMAGEBANNER
    let decodeImageProperty = (data) => {
        data?.[imageBanner] && data[imageBanner].map(item => {
            decodeImageBanner(item)
        })
    }
    let query = {
        include: [
            { model: db.Image_Banner, as: association.BANNER_IMAGEBANNER }
        ]
    }
    return new Promise(async (resolve, reject) => {
        try {
            let data
            if (id) {
                data = await db.Banner.findOne({ where: { id: id }, ...query })
                decodeImageProperty(data)
            } else {
                data = await db.Banner.findAll(query)
                data && data.map((item) => {
                    decodeImageProperty(item)
                })
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
            if (!func.CHECK_HAS_VALUE(data.id, data.name)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let banner = await db.Banner.findOne({ where: { id: data.id } })
                await banner.update({
                    name: data.name,
                })
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
                let campaign = await db.Campaign.findOne({ where: { bannerId: data.id } })
                if (campaign) {
                    resolve(resolveObj.EXIST_REF_KEY)
                    throw new Error()
                }
                await db.Image_Banner.destroy({ where: { bannerId: data.id } })
                await db.Banner.destroy({ where: { id: data.id } })
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e)
        }
    })
}

// image banner

let createImageBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.bannerId || !data.image) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                if (isBase64(data.image)) {
                    resolve({ errCode: 1, errMessage: 'image is not base64 type' })
                    throw new Error()
                }
                await db.Image_Banner.create({
                    bannerId: data.bannerId,
                    image: data.image,
                    type: data.type ? data.type : undefined
                })
            })
            resolve(resolveObj.CREATE_SUCCEED())
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
                await db.Image_Banner.destroy({ where: { id: data.id } })
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createBanner,
    getBanner,
    updateBanner,
    deleteBanner,

    createImageBanner,
    deleteImageBanner,
}