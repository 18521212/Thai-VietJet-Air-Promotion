import { text, resolveObj, services } from '../utils/constant';
import { association, func } from '../utils'

const db = require('../models');

// footer

let createFooter = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            await db.sequelize.transaction(async (t) => {
                // await db.Footer.create({
                //     name: data.name,
                //     term_and_condition: data.term_and_condition,
                //     faq: data.faq,
                //     how_to_use: data.how_to_use
                // }, { transaction: t })
                await db.Footer.create(data)
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
                    { model: db.Footer_Text, as: 'footer_text' },
                    { model: db.Markdown, as: association.MARKDOWN_TERM_AND_CONDITION },
                    { model: db.Markdown, as: association.MARKDOWN_HOW_TO_USE },
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
            if (!func.CHECK_HAS_VALUE(data.id) || !func.CHECK_HAS_VALUE_OR(data.name, data.term_and_condition, data.faq, data.how_to_use)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }

            await db.sequelize.transaction(async (t) => {
                let footer = await db.Footer.findOne({ where: { id: data.id } })
                // await footer.update({
                //     name: data.name,
                //     term_and_condition: data.term_and_condition,
                //     faq: data.faq,
                //     how_to_use: data.how_to_use
                // }, { transaction: t })
                await footer.update(data)
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

let createMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.titleEn, data.contentEn, data.markdownEn)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            await db.sequelize.transaction(async (t) => {
                await db.Markdown.create({
                    titleEn: data.titleEn,
                    titleTh: data.titleTh ? data.titleTh : data.titleEn,
                    contentEn: data.contentEn,
                    contentTh: data.contentTh ? data.contentTh : data.contentEn,
                    markdownEn: data.markdownEn,
                    markdownTh: data.markdownTh ? data.markdownTh : data.markdownEn
                })
            })
            resolve(resolveObj.CREATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let getMarkdown = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data
            if (id) {
                data = await db.Markdown.findOne({ where: { id: id } })
            } else {
                data = await db.Markdown.findAll()
            }
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e);
        }
    })
}

let updateMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id)
                || !func.CHECK_HAS_VALUE_OR(data.titleEn, data.titleTh,
                    data.contentEn, data.contentTh,
                    data.markdownEn, data.markdownTh)
            ) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let markdown = await db.Markdown.findOne({ where: { id: data.id } })
                // await markdown.update({
                //     titleEn: data.titleEn,
                //     titleTh: data.titleTh,
                //     contentEn: data.contentEn,
                //     contentTh: data.contentTh
                // })
                await markdown.update(data)
            })
            resolve(resolveObj.UPDATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let deleteMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                // check  onDelete Restrict
                await db.Markdown.destroy({ where: { id: data.id } })
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createFooter,
    getFooter,
    updateFooter,
    deleteFooter,

    createFooterText,
    getAllFooterText,
    updateFooterText,
    deleteFooterText,

    createMarkdown,
    getMarkdown,
    updateMarkdown,
    deleteMarkdown,
}