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
    return deleteData(api.FOOTERS, data.id)
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
    return deleteData(api.FOOTER_TEXTS, data.id)
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
}