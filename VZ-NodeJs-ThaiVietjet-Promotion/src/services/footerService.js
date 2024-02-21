import { text, resolveObj, services } from '../utils/constant';
import { association, func } from '../utils'
import { create, get, update, deleteData } from './constantService'

const db = require('../models');

// footer

let createFooter = (data) => {
    return create({
        table: 'Footer',
        required: {
            and: ['name']
        }
    }, data)
}

let getFooter = (data) => {
    return get({
        table: 'Footer',
        query: {
            include: [
                { model: db.Footer_Text, as: 'footer_text' },
                { model: db.Markdown, as: association.MARKDOWN_TERM_AND_CONDITION },
                { model: db.Markdown, as: association.MARKDOWN_HOW_TO_USE },
                {
                    model: db.FAQ, as: association.FAQ_FOOTER,
                    include: [
                        { model: db.FAQ_Question, as: association.FAQ_FAQID }
                    ]
                }
            ]
        }
    }, data)
}

let updateFooter = (data) => {
    return update({
        table: 'Footer',
        required: {
            and: ['id'],
            or: ['name', 'term_and_condition', 'faq', 'how_to_use']
        }
    }, data)
}

let deleteFooter = (data) => {
    return deleteData({
        table: 'Footer'
    }, data)
}

// footer text

let createFooterText = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.footerId || !data.title || !data.link) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _footer = await db.Footer.findOne({ where: { id: data.footerId } })
                if (!_footer) {
                    _response = resolveObj.NOT_FOUND('Footer')
                } else {
                    let _cre_f = await db.Footer_Text.create({
                        footerId: data.footerId,
                        title: data.title,
                        link: data.link
                    })
                    if (_cre_f) {
                        _response = resolveObj.CREATE_SUCCEED()
                    } else {
                        _response = resolveObj.CREATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllFooterText = (footerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!footerId) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_ft = await db.Footer_Text
                    .cache(`all/Footer/${footerId}`)
                    .findAll({ where: { footerId: footerId } })
                _response = resolveObj.GET(_get_ft)
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let updateFooterText = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id || !data.title || !data.link) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_ft = await db.Footer_Text.findByPk(data.id)
                if (!_get_ft) {
                    _response = resolveObj.NOT_FOUND('Footer Text')
                } else {
                    let _upd_ft = await footer_text.update({
                        title: data.title,
                        link: data.link
                    })
                    if (_upd_ft) {
                        _response = resolveObj.UPDATE_SUCCEED()
                    } else {
                        _response = resolveObj.UPDATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteFooterText = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _del_ft = await db.Footer_Text.destroy({ where: { id: id } })
                if (_del_ft) {
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

let createMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.titleEn, data.contentEn, data.markdownEn)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _cre_m = await db.Markdown.create({
                    titleEn: data.titleEn,
                    titleTh: data.titleTh ? data.titleTh : data.titleEn,
                    contentEn: data.contentEn,
                    contentTh: data.contentTh ? data.contentTh : data.contentEn,
                    markdownEn: data.markdownEn,
                    markdownTh: data.markdownTh ? data.markdownTh : data.markdownEn
                })
                if (_cre_m) {
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

let getMarkdown = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data
            let _response
            if (id) {
                data = await db.Markdown.findOne({ where: { id: id } })
            } else {
                data = await db.Markdown.findAll()
            }
            _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateMarkdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id)
                || !func.CHECK_HAS_VALUE_OR(data.titleEn, data.titleTh,
                    data.contentEn, data.contentTh,
                    data.markdownEn, data.markdownTh)
            ) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_m = await db.Markdown.findByPk(data.id)
                if (_get_m) {
                    let _upd_m = await _get_m.update(data)
                    if (_upd_m) {
                        _response = resolveObj.UPDATE_SUCCEED()
                    } else {
                        _response = resolveObj.UPDATE_UNSUCCEED()
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

let deleteMarkdown = (data) => {
    return deleteData({
        table: 'Markdown',
        ref: [
            { table: 'Footer', priKey: 'id', refKey: 'how_to_use' },
            { table: 'Footer', priKey: 'id', refKey: 'term_and_condition' },
            { table: 'Pack', priKey: 'id', refKey: 'markdownId' },
        ]
    }, data)
}

// FAQ

let FAQ_Table = 'FAQ'

let createFAQ = (data) => {
    return create({
        table: FAQ_Table,
        required: {
            and: ['name']
        }
    }, data)
}

let getFAQ = (data) => {
    return get({
        table: FAQ_Table,
        query: {
            include: [
                { model: db.FAQ_Question, as: association.FAQ_FAQID }
            ]
        }
    }, data)
}

let updateFAQ = (data) => {
    return update({
        table: FAQ_Table,
        required: {
            and: ['id'],
            or: ['name']
        }
    }, data)
}

let deleteFAQ = (data) => {
    return deleteData({
        table: FAQ_Table,
        ref: [
            { table: 'FAQ_Question', priKey: 'id', refKey: 'FAQId' }
        ]
    }, data)
}

// FAQ Question

let FAQQ_Table = 'FAQ_Question'

let createFAQQuestion = (data) => {
    return create({
        table: FAQQ_Table,
        required: {
            and: ['FAQId', 'question', 'answer']
        },
    }, data)
}

let getFAQQuestion = (data) => {
    return get({
        table: FAQQ_Table
    }, data)
}

let updateFAQQuestion = (data) => {
    return update({
        table: FAQQ_Table,
        required: {
            and: ['FAQId'],
            or: ['question', 'answer']
        }
    }, data)
}

let deleteFAQQuestion = (data) => {
    return deleteData({
        table: FAQQ_Table,
    }, data)
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

    createFAQ,
    getFAQ,
    updateFAQ,
    deleteFAQ,

    createFAQQuestion,
    getFAQQuestion,
    updateFAQQuestion,
    deleteFAQQuestion,
}