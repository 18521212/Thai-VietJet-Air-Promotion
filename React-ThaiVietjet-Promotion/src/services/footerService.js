import { api } from "utils";
import { create, get, update, deleteData } from 'services/constantService'

// footer

const createFooter = (data) => {
    return create(api.FOOTERS, data)
}

const getFooter = (id) => {
    return get(api.FOOTERS, id)
}

const updateFooter = (data) => {
    return update(api.FOOTERS, data)
}

const deleteFooter = (data) => {
    return deleteData(api.FOOTERS, data)
}

// footer text

const createFooterText = (data) => {
    return create(api.FOOTER_TEXTS, data)
}

const getFooterText = (id) => {
    return get(api.FOOTER_TEXTS + `/footers`, id)
    // return axios.get(api.FOOTER_TEXTS + `/footers/${id}`)
}

const updateFooterText = (data) => {
    return update(api.FOOTER_TEXTS, data)
}

const deleteFooterText = (data) => {
    return deleteData(api.FOOTER_TEXTS, data)
}

// markdown

const createMarkdown = (data) => {
    return create(api.MARKDOWNS, data)
}

const getMarkdown = (id) => {
    return get(api.MARKDOWNS, id)
}

const updateMarkdown = (data) => {
    return update(api.MARKDOWNS, data)
}

const deleteMarkdown = (data) => {
    return deleteData(api.MARKDOWNS, data)
}

// FAQ

const createFAQ = (data) => {
    return create(api.FAQS, data)
}

const getFAQ = (id) => {
    return get(api.FAQS, id)
}

const updateFAQ = (data) => {
    return update(api.FAQS, data)
}

const deleteFAQ = (data) => {
    return deleteData(api.FAQS, data)
}

// FAQ question

const createFAQQuestion = (data) => {
    return create(api.FAQ_QUESTIONS, data)
}

const getFAQQuestion = (id) => {
    return get(api.FAQ_QUESTIONS, id)
}

const updateFAQQuestion = (data) => {
    return update(api.FAQ_QUESTIONS, data)
}

const deleteFAQQuestion = (data) => {
    return deleteData(api.FAQ_QUESTIONS, data)
}

export {
    createFooter,
    getFooter,
    updateFooter,
    deleteFooter,

    createFooterText,
    getFooterText,
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