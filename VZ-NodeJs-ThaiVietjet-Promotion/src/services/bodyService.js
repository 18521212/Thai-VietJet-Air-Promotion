const db = require('../models');
const { resolveObj, func } = require('../utils');

let createBody = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.name)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _cre_cb = await db.Content_Body.create({
                    name: data.name,
                    contentEn: data.contentEn,
                    contentTh: data.contentTh,
                    markdownEn: data.markdownEn,
                    markdownTh: data.markdownTh
                })
                if (_cre_cb) {
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

let getContentBody = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            let _data
            if (id) {
                _data = await db.Content_Body
                    .cache()
                    .findByPk(id)
            } else {
                _data = await db.Content_Body
                    .cache('all')
                    .findAll()
            }
            _response = resolveObj.GET(_data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateBody = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id, data.name)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_b = await db.Content_Body
                    .findOne({ where: { id: data.id } })
                let _upd_b = await _get_b
                    .cache()
                    .update({
                        name: data.name,
                        contentEn: data.contentEn,
                        contentTh: data.contentTh,
                        markdownEn: data.markdownEn,
                        markdownTh: data.markdownTh
                    })
                if (_upd_b) {
                    _response = resolveObj.UPDATE_SUCCEED()
                } else {
                    _response = resolveObj.UPDATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteBody = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(id)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _content_body = await db.Content_Body
                    .findByPk(id)
                if (_content_body) {
                    let _del_cb = await _content_body
                        .cache()
                        .destroy({
                            where: { id: id },
                            transaction: t
                        })
                    if (_del_cb) {
                        _response = resolveObj.DELETE_SUCCEED()
                    } else {
                        _response = resolveObj.DELETE_UNSUCCEED()
                    }
                } else {
                    _response = resolveObj.NOT_FOUND()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createBody,
    getContentBody,
    updateBody,
    deleteBody,
}