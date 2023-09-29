import { toast } from "react-toastify";
import axios from "../axios";

// campaign

const getAllCampaign = () => {
    return axios.get('/api/campaigns')
}

const getCampaign = (id) => {
    if (id) {
        return axios.get(`/api/campaigns/${id}`)
    } else {
        return axios.get(`/api/campaigns`)
    }
}

const updateCampaign = (data) => {
    return axios.put('/api/campaigns', data)
}

// header 
const createHeader = (data) => {
    return axios.post('/api/headers', data)
}

const getAllHeader = () => {
    return axios.get('/api/headers');
}

const updateHeader = (data) => {
    return axios.put('/api/headers', data);
}

const deleteHeader = (id) => {
    return axios.delete('/api/headers', {
        data: {
            id: id
        }
    })
}

// menu

const createMenu = (data) => {
    return axios.post('/api/menus', data)
}

const getAllMenu = () => {
    return axios.get('/api/menus')
}

const updateMenu = (data) => {
    return axios.put('/api/menus', data)
}

const deleteMenu = (data) => {
    return axios.delete('/api/menus', {
        data: {
            id: data.id
        }
    })
}

// menu item

const createMenuItem = (data) => {
    return axios.post('/api/menu-items', data)
}

const getAllMenuItemByMenuId = (menuId) => {
    return axios.get(`/api/menu-items/menus/${menuId}`)
}

const updateMenuItem = (data) => {
    return axios.put('/api/menu-items', data)
}

const deleteMenuItem = (data) => {
    return axios.delete('/api/menu-items', {
        data: {
            id: data.id
        }
    })
}

// sub menu

const createSubMenu = (data) => {
    return axios.post('/api/sub-menus', data)
}

const getAllSubMenuByMenuItemId = (menuParentId) => {
    return axios.get(`/api/sub-menus/menu-items/${menuParentId}`)
}

const updateSubMenu = (data) => {
    return axios.put('/api/sub-menus', data)
}

const deleteSubMenu = (data) => {
    return axios.delete('/api/sub-menus', {
        data: {
            id: data.id
        }
    })
}

// banner

const getAllBanners = (id) => {
    return axios.get('/api/banners');
    // return axios.get('http://localhost:3002/api/get-all-banners');
}

// body

const getContentBody = (id) => {
    if (id) {
        return axios.get(`/api/content-bodys/${id}`)
    } else {
        return axios.get(`/api/content-bodys`)
    }
}

// form

const getForm = (id) => {
    if (id) {
        return axios.get(`/api/forms/${id}`)
    } else {
        return axios.get(`/api/forms`)
    }
}

const getAllTextInput = () => {
    return axios.get('/api/get-all-text-input')
}

// footer

const getFooter = (id) => {
    if (id) {
        return axios.get(`/api/footers/${id}`)
    } else {
        return axios.get(`/api/footers`)
    }
}

// pack

const getAllPack = () => {
    return axios.get('/api/packs')
}

export {
    getAllBanners, getAllMenuItemByMenuId, getAllHeader,
    getAllTextInput, getAllPack,
    getContentBody, getAllCampaign, createHeader,
    deleteHeader, getAllMenu, createMenu, deleteMenu,
    updateMenu, createMenuItem, deleteMenuItem,
    updateMenuItem, createSubMenu, getAllSubMenuByMenuItemId,
    deleteSubMenu, updateSubMenu, updateHeader,
    getCampaign, getForm, getFooter, updateCampaign
}