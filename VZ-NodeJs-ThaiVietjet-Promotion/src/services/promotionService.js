const db = require('../models');
const { resolveObj, func, type } = require('../utils');

// promotion
let createPromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.name)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                await db.Promotion.create({ name: data.name }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED('Promotion'))
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
                    { model: db.Pack, as: 'pack' }
                ]
            }
            let data
            if (id) {
                data = await db.Promotion.findOne({
                    where: { id: id },
                    ...objectQuery
                })
            } else {
                data = await db.Promotion.findAll(objectQuery)
            }
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e);
        }
    })
}

let updatePromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id, data.name)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let promotion = await db.Promotion.findOne({ where: { id: data.id } })
                if (!promotion) { resolve(resolveObj.NOT_FOUND('Promotion')); throw new Error() }
                await promotion.update({ name: data.name }, { transaction: t })
            })
            resolve(resolveObj.UPDATE_SUCCEED('Promotion'))
        } catch (e) {
            reject(e);
        }
    })
}

let deletePromotion = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let pack = await db.Pack.findAll({ where: { promotionId: data.id } })
                if (pack.length > 0) {
                    resolve(resolveObj.EXIST_REF_KEY)
                    throw new Error()
                }
                let deleted = await db.Promotion.destroy({ where: { id: data.id }, transaction: t })
                if (deleted === 0) { resolve(resolveObj.DELETE_UNSUCCEED('Promotion')); throw new Error() }
            })
            resolve(resolveObj.DELETE_SUCCEED('Promotion'))
        } catch (e) {
            reject(e);
        }
    })
}

// pack
let createPack = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.name, data.promotionId, data.maxNumber, data.price, data.numberRedeem)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let promotion = await db.Promotion.findOne({ where: { id: data.promotionId } })
                if (!promotion) { resolve(resolveObj.NOT_FOUND('Promotion')); throw new Error() }
                await db.Pack.create({
                    name: data?.name,
                    promotionId: data.promotionId,
                    maxNumber: data?.maxNumber,
                    price: data?.price,
                    currency: data?.currency ? data.currency : undefined,
                    numberRedeem: data?.numberRedeem
                }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED('Pack'))
        } catch (e) {
            reject(e);
        }
    })
}

let getPack = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data
            if (id) {
                data = await db.Pack.findOne({ where: { id: id } })
            } else {
                data = await db.Pack.findAll()
            }
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e);
        }
    })
}

let updatePack = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id) || !func.CHECK_HAS_VALUE_OR(data.name, data.maxNumber,
                data.price, data.currency, data.numberRedeem)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let pack = await db.Pack.findOne({ where: { id: data.id } })
                await pack.update({
                    name: data?.name,
                    maxNumber: data?.maxNumber,
                    price: data?.price,
                    currency: data?.currency,
                    numberRedeem: data?.numberRedeem
                }, { transaction: t })
            })
            resolve(resolveObj.UPDATE_SUCCEED('Pack'))
        } catch (e) {
            reject(e);
        }
    })
}

let deletePack = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                await db.Pack.destroy({
                    where: {
                        id: data.id
                    },
                    transaction: t
                })
            })
            resolve(resolveObj.DELETE_SUCCEED())
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