const db = require('../models');
const { resolveObj, func, type, association } = require('../utils');

let queryPack = {
    include: [
        { model: db.Markdown, as: association.MARKDOWN_PACK }
    ]
}

// promotion
let createPromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.name)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _cre_pr =
                    await db.Promotion
                        .create({ name: data.name })
                if (_cre_pr) {
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

let getPromotion = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let objectQuery = {
                include: [
                    { model: db.Pack, as: 'pack', ...queryPack }
                ]
            }
            let _response
            let data
            if (id) {
                data =
                    await db.Promotion
                        .cache()
                        .findByPk(id,
                            objectQuery
                        )
            } else {
                data =
                    await db.Promotion
                        .cache('all')
                        .findAll(objectQuery)
            }
            _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updatePromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id, data.name)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_pr =
                    await db.Promotion
                        .findOne({ where: { id: data.id } })
                if (!_get_pr) {
                    _response = resolveObj.NOT_FOUND('Promotion')
                } else {
                    let _upd_pr =
                        await _get_pr
                            .cache()
                            .update({ name: data.name })
                    if (_upd_pr) {
                        _response = resolveObj.UPDATE_SUCCEED()
                    } else {
                        _response = resolveObj.UPDATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deletePromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_p =
                    await db.Pack
                        .findAll({ where: { promotionId: data.id } })
                if (_get_p.length > 0) {
                    _response = resolveObj.EXIST_REF_KEY
                } else {
                    let _get_p =
                        await db.Promotion
                            .findByPk(data.id)
                    let _del_pr =
                        await _get_p
                            .cache()
                            .destroy()
                    if (_del_pr) {
                        _response = resolveObj.DELETE_SUCCEED()
                    } else {
                        _response = resolveObj.DELETE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let validatePack = (data) => {
    let validate = true
    if (data.price <= 0 || data.vat < 0 || data.vat > 1 || data.maxNumber <= 0) {
        validate = false
    }
    return validate
}

// pack
let createPack = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.name, data.promotionId, data.maxNumber, data.price)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                if (validatePack(data) === false) {
                    _response = { errCode: 1, errMessage: 'invalid data' }
                } else {
                    let _get_pr =
                        await db.Promotion
                            .findByPk(data.promotionId)
                    if (!_get_pr) {
                        _response = resolveObj.NOT_FOUND('Promotion')
                    } else {
                        let _cre_p =
                            await db.Pack
                                .create(data)
                        if (_cre_p) {
                            _response = resolveObj.CREATE_SUCCEED()
                        } else {
                            _response = resolveObj.CREATE_UNSUCCEED()
                        }
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let getPack = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data
            let _response
            if (id) {
                if (id.length > 0) {
                    data =
                        await db.Pack
                            .findAll({ where: { id: id }, ...queryPack })
                } else {
                    data =
                        await db.Pack
                            .findOne({ where: { id: id }, ...queryPack })
                }
            } else {
                data =
                    await db.Pack
                        .findAll(queryPack)
            }
            _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updatePack = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id) || !func.CHECK_HAS_VALUE_OR(data.name, data.maxNumber,
                data.price, data.currency, data.numberRedeem)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                if (validatePack(data) === false) {
                    _response = { errCode: 1, errMessage: 'invalid data' }
                } else {
                    let _get_p =
                        await db.Pack
                            .findByPk(data.id)
                    let _upd_p =
                        await _get_p
                            .update({
                                name: data?.name,
                                maxNumber: data?.maxNumber,
                                price: data?.price,
                                currency: data?.currency,
                                numberRedeem: data?.numberRedeem,
                                vat: data.vat,
                                markdownId: data.markdownId ? data.markdownId : null
                            })
                    if (_upd_p) {
                        _response = resolveObj.UPDATE_SUCCEED()
                    } else {
                        _response = resolveObj.UPDATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deletePack = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_p =
                    await db.Pack
                        .findByPk(data.id)
                let _del_p =
                    await _get_p
                        .destroy()
                if (_del_p) {
                    _response = resolveObj.DELETE_SUCCEED()
                } else {
                    _response = resolveObj.DELETE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createPromotion,
    getPromotion,
    updatePromotion,
    deletePromotion,

    createPack,
    getPack,
    updatePack,
    deletePack,
}