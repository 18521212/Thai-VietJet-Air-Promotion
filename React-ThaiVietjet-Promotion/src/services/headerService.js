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
    return deleteData(api.HEADERS, data)
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

// menu item

const createMenuItem = (data) => {
    return create(api.MENU_ITEMS, data)
}

const getAllMenuItemByMenuId = (menuId) => {
    return get(`/api/menu-items/menus`, menuId)
}

const updateMenuItem = (data) => {
    return update(api.MENU_ITEMS, data)
}

const deleteMenuItem = (data) => {
    return deleteData(api.MENU_ITEMS, data)
}

// sub menu

const createSubMenu = (data) => {
    return create(api.SUB_MENUS, data)
}

const getAllSubMenuByMenuItemId = (menuParentId) => {
    return get(`/api/sub-menus/menu-items`, menuParentId)
    // return axios.get(`/api/sub-menus/menu-items/${menuParentId}`)
}

const updateSubMenu = (data) => {
    return update(api.SUB_MENUS, data)
}

const deleteSubMenu = (data) => {
    return deleteData(api.SUB_MENUS, data)
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

    createMenuItem,
    getAllMenuItemByMenuId,
    updateMenuItem,
    deleteMenuItem,

    createSubMenu,
    getAllSubMenuByMenuItemId,
    updateSubMenu,
    deleteSubMenu,
}