import { api } from "utils";
import { create, get, update, deleteData } from 'services/constantService'

// header 
const createHeader = (data) => {
    return create(api.HEADERS, data)
}

const getHeader = (id) => {
    return get(api.HEADERS, id)
}

const updateHeader = (data) => {
    return update(api.HEADERS, data)
}

const deleteHeader = (data) => {
    return deleteData(api.HEADERS, data.id)
}

// menu
const createMenu = (data) => {
    return create(api.MENUS, data)
}

const getMenu = (id) => {
    return get(api.MENUS, id)
}

const updateMenu = (data) => {
    return update(api.MENUS, data)
}

const deleteMenu = (data) => {
    return deleteData(api.MENUS, data)
}

export {
    createHeader,
    getHeader,
    updateHeader,
    deleteHeader,

    createMenu,
    getMenu,
    updateMenu,
    deleteMenu,
}