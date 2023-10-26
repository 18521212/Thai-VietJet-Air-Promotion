import { text, resolveObj, services } from '../utils/constant';

const db = require('../models');

// footer

let createFooter = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            console.log(data)

            await db.sequelize.transaction(async (t) => {
                await db.Footer.create({
                    name: data.name
                }, { transaction: t })
                resolve(resolveObj.CREATE_SUCCEED('footer'))
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getFooter = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                include: [
                    { model: db.Footer_Text, as: 'footer_text' }
                ]
            }
            let data
            if (id) {
                data = await db.Footer.findOne({
                    where: { id: id },
                    ...query
                })
            } else {
                data = await db.Footer.findAll(query)
            }
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e);
        }
    })
}

let updateFooter = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }

            await db.sequelize.transaction(async (t) => {
                let footer = await db.Footer.findOne({ where: { id: data.id } })
                await footer.update({
                    name: data.name
                }, { transaction: t })

                resolve(resolveObj.UPDATE_SUCCEED('Footer'))
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteFooter = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            await db.sequelize.transaction(async (t) => {
                await db.Footer_Text.destroy({ where: { footerId: id }, transaction: t })
                let data = await db.Footer.destroy({ where: { id: id }, transaction: t })
                if (data === 0) {
                    resolve(resolveObj.DELETE_UNSUCCEED('Footer'))
                }
            })
            resolve(resolveObj.DELETE_SUCCEED('Footer'))
        } catch (e) {
            reject(e);
        }
    })
}

// footer text

let createFooterText = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.footerId || !data.title || !data.link) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            await db.sequelize.transaction(async (t) => {
                let footer = await db.Footer.findOne({ where: { id: data.footerId } })
                if (!footer) {
                    resolve(resolveObj.NOT_FOUND('Footer'))
                    throw new Error()
                }
                await db.Footer_Text.create({
                    footerId: data.footerId,
                    title: data.title,
                    link: data.link
                }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let getAllFooterText = (footerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataApi = await db.Footer_Text.findAll({ where: { footerId: footerId } })
            resolve(resolveObj.GET(dataApi))
        } catch (e) {
            reject(e)
        }
    })
}

let updateFooterText = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.title || !data.link) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }

            await db.sequelize.transaction(async (t) => {
                let footer_text = await db.Footer_Text.findOne({ where: { id: data.id } })
                if (!footer_text) {
                    resolve(resolveObj.NOT_FOUND('Footer Text'))
                    throw new Error()
                }
                await footer_text.update({
                    title: data.title,
                    link: data.link
                }, { transaction: t })
            })
            resolve(resolveObj.UPDATE_SUCCEED('Footer_Text'))
        } catch (e) {
            reject(e)
        }
    })
}

let deleteFooterText = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            await db.sequelize.transaction(async (t) => {
                await db.Footer_Text.destroy({ where: { id: id } })
            })
            resolve(resolveObj.DELETE_SUCCEED('Footer Text'))
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createFooter: createFooter,
    getFooter,
    updateFooter: updateFooter,
    deleteFooter: deleteFooter,

    createFooterText: createFooterText,
    getAllFooterText: getAllFooterText,
    updateFooterText: updateFooterText,
    deleteFooterText,
}