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
            if (!checkHasValueAndOr(config, data)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            console.log('ta', config.table)
            await db.sequelize.transaction(async (t) => {
                await db[config.table].create(data)
            })
            resolve(resolveObj.CREATE_SUCCEED())
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

let get = (config, param) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = config?.query
            let data
            if (param?.id) {
                data = await db[config.table].findOne({ where: { id: param.id }, ...query })
            } else {
                data = await db[config.table].findAll(query)
            }
            resolve(resolveObj.GET(data))
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
            if (!checkHasValueAndOr(config, data)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            await db.sequelize.transaction(async (t) => {
                let table = await db[config.table].findOne({ where: { id: data.id } })
                await table.update(data)
            })
            resolve(resolveObj.UPDATE_SUCCEED())
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
            if (!func.CHECK_HAS_VALUE(data.id)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let checkRef = true
                if (config?.ref?.length > 0) {
                    for (let i = 0; i < config.ref.length; i++) {
                        let item = config.ref[i]
                        let refItem = await db[item.table].findOne({ where: { [item.refKey]: data[item.priKey ? item.priKey : 'id'] } })
                        if (refItem) {
                            checkRef = false
                            break
                        }
                    }
                }
                if (!checkRef) {
                    resolve(resolveObj.EXIST_REF_KEY)
                    throw new Error()
                }
                let deleted = await db[config.table].destroy({ where: { id: data.id } })
                if (deleted === 0) {
                    resolve(resolveObj.DELETE_UNSUCCEED())
                    throw new Error()
                }
            })
            resolve(resolveObj.DELETE_SUCCEED())
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