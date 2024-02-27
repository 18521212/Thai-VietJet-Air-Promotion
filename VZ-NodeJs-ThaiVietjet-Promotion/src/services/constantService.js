import { text, resolveObj, services } from '../utils/constant';
import { association, func } from '../utils'

const db = require('../models');

let checkHasValueAndOr = (config, data) => {
    let and = true
    if (config?.required?.and?.length > 0) {
        for (let i = 0; i < config.required.and.length; i++) {
            if (!data[config.required.and[i]]) {
                and = false
                break
            }
        }
    }
    let or = false
    if (config?.required?.or?.length > 0) {
        for (let i = 0; i < config.required.or.length; i++) {
            if (data[config.required.or[i]]) {
                or = true
                break
            }
        }
    } else {
        or = true
    }
    return and && or
}

// usage
// create({
//     table: '',
//     required: {
//         and: [],
//         or: [],
//     }
// }, data)

let create = (config, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!checkHasValueAndOr(config, data)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _cre =
                    await db[config.table]
                        .create(data)
                if (_cre) {
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

// usage
// get({
//     table: '',
//     query: '',
// }, id)

// let cacheKey = (query = [], string = '') => {
//     let _string = string
//     query.include.forEach(association => {
//         let _model_name = association.model.name
//         if (!_string.includes(_model_name)) {
//             _string = _string.concat('/' + _model_name)
//         }
//         if (association.include) {
//             _string = cacheKey(association, _string)
//         }
//     });
//     return _string
// }

// let appendId = (id, _string) => {
//     return id + _string + ''
// }

let get = (config, param) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = config?.query
            let data
            let _response
            if (param?.id) {
                data =
                    await db[config.table]
                        .cache()
                        .findByPk(param.id, query)
            } else {
                data =
                    await db[config.table]
                        .cache('all')
                        .findAll(query)
            }
            _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

// usage
// update({
//     table: '',
//     required: {
//         and: [],
//         or: [],
//     }
// }, data)

let update = (config, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!checkHasValueAndOr(config, data)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_dt =
                    await db[config.table]
                        .findOne({ where: { id: data.id } })
                let _upd_dt =
                    await _get_dt
                        .cache()
                        .update(data)
                if (_upd_dt) {
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

// usage
// deleteData({
//     table: ''
// }, data)

let deleteData = (config, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let checkRef = true
                if (config?.ref?.length > 0) {
                    for (let i = 0; i < config.ref.length; i++) {
                        let item = config.ref[i]
                        let refItem =
                            await db[item.table]
                                .findOne({
                                    where: {
                                        [item.refKey]: data[item.priKey ? item.priKey : 'id']
                                    }
                                })
                        if (refItem) {
                            checkRef = false
                            break
                        }
                    }
                }
                if (!checkRef) {
                    _response = resolveObj.EXIST_REF_KEY
                } else {
                    let _get_dt =
                        await db[config.table]
                            .cache()
                            .findByPk(data.id)
                    if (_get_dt) {
                        let _del_dt =
                            await _get_dt
                                .cache()
                                .destroy()
                        if (_del_dt) {
                            _response = resolveObj.DELETE_SUCCEED()
                        } else {
                            _response = resolveObj.DELETE_UNSUCCEED()
                        }
                    } else {
                        _response = resolveObj.NOT_FOUND()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    create,
    get,
    update,
    deleteData,
}