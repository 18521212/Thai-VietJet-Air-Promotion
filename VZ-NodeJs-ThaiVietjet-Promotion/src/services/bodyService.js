const db = require('../models');
const { resolveObj, func } = require('../utils');

let createBody = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.name)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                await db.Content_Body.create({
                    name: data.name,
                    contentEn: data.contentEn,
                    contentTh: data.contentTh,
                    markdownEn: data.markdownEn,
                    markdownTh: data.markdownTh
                }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let getAllContentBody = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Content_Body.findAll()
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e);
        }
    })
}

let getContentBodyById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Content_Body.findOne({
                    where: {
                        id: id
                    }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateBody = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id, data.name)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let body = await db.Content_Body.findOne({ where: { id: data.id } }, { transaction: t })
                await body.update({
                    name: data.name,
                    contentEn: data.contentEn,
                    contentTh: data.contentTh,
                    markdownEn: data.markdownEn,
                    markdownTh: data.markdownTh
                }, { transaction: t })
            })
            resolve(resolveObj.UPDATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let deleteBody = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(id)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                await db.Content_Body.destroy({
                    where: { id: id },
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
    createBody,
    getAllContentBody: getAllContentBody,
    getContentBodyById: getContentBodyById,
    updateBody,
    deleteBody,
}