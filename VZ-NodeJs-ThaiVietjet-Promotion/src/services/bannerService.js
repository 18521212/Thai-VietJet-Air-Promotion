const db = require('../models');
const { resolveObj, func, association } = require('../utils');
import isBase64 from 'is-base64'
import { delKey } from '../utils';

// banner

let createBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.name) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _cre_b =
                    await db.Banner
                        .create({
                            name: data.name,
                        })
                if (_cre_b) {
                    _response = resolveObj.CREATE_SUCCEED()
                } else {
                    _response = resolveObj.CREATE_UNSUCCEED()
                }
            }
            resolve(_response)
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
            let _response
            let data
            if (id) {
                data =
                    await db.Banner
                        // .cache(id)
                        .findOne({ where: { id: id }, ...query })
                decodeImageProperty(data)
            } else {
                data =
                    await db.Banner
                        // .cache('all')
                        .findAll(query)
                data &&
                    data
                        .map((item) => {
                            decodeImageProperty(item)
                        })
            }
            _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let updateBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id, data.name)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let banner =
                    await db.Banner
                        .findByPk(data.id)
                let _upd_b =
                    await banner
                        .cache(data.id)
                        .update({
                            name: data.name,
                        })
                if (_upd_b) {
                    _response = resolveObj.UPDATE_SUCCEED()
                } else {
                    _response = resolveObj.UPDATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let campaign =
                    await db.Campaign
                        .findOne({ where: { bannerId: data.id } })
                if (campaign) {
                    _response = resolveObj.EXIST_REF_KEY
                } else {
                    let _transaction_status = false
                    try {
                        await db.sequelize.transaction(async (t) => {
                            await db.Image_Banner
                                .destroy({ where: { bannerId: data.id }, transaction: t })
                            await db.Banner
                                .cache()
                                .destroy({ where: { id: data.id }, transaction: t });
                        })
                        _transaction_status = true
                    } catch (e) {
                        _transaction_status = false
                    }
                    if (_transaction_status) {
                        _response = resolveObj.DELETE_SUCCEED()
                    } else {
                        _response = resolveObj.DELETE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

// image banner
// config size allowed image
let configImage = {
    mobile: { width: 1040, height: 1040 },
    desktop: { width: 1920, height: 520 },
}

let validateImage = async (_image, _typeImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            let base64String = _image
            if (!base64String || !_typeImage) {
                _response = {
                    errCode: 1,
                    errMessage: 'missing image or image type'
                }
            } else {
                const base64Image = base64String.split(';base64,').pop()
                const imageBuffer = Buffer.from(base64Image, 'base64')
                const sharp = require('sharp');
                const metadata = await sharp(imageBuffer).metadata();
                let valid = false
                if (_typeImage === 'mobile') {
                    if (metadata.width == configImage.mobile.width || metadata.height == configImage.mobile.height) {
                        valid = true
                    }
                } else if (_typeImage === 'desktop') {
                    if (metadata.width == configImage.desktop.width || metadata.height == configImage.desktop.height) {
                        valid = true
                    }
                }
                if (valid) {
                    _response = {
                        errCode: 0,
                        errMessage: 'ok'
                    }
                } else {
                    _response = {
                        errCode: 1,
                        errMessage: 'invalid image size'
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let createImageBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.bannerId || !data.image) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                // USAGE isBase64(): isBase64(any_image) == true -> image type isn't 'base64'
                if (isBase64(data.image)) {
                    _response = { errCode: 1, errMessage: 'image is not base64 type' }
                } else {
                    let _cre_ib =
                        await db.Image_Banner
                            .create({
                                bannerId: data.bannerId,
                                image: data.image,
                                type: data.type ? data.type : undefined
                            })
                    if (_cre_ib) {
                        _response = resolveObj.CREATE_SUCCEED()
                    } else {
                        _response = resolveObj.CREATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteImageBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_ib =
                    await db.Image_Banner
                        .findByPk(data.id)
                let _del_ib =
                    await _get_ib
                        .destroy()
                if (_del_ib) {
                    _response = resolveObj.DELETE_SUCCEED()
                } else {
                    _response = resolveObj.DELETE_UNSUCCEED()
                }
            }
            resolve(_response)
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

    validateImage,
    createImageBanner,
    deleteImageBanner,
}