import axios from "../axios";

// campaign

const getAllCampaign = () => {
    return axios.get('/api/campaigns')
}

// header 
const createHeader = (data) => {
    return axios.post('/api/headers', data)
}

const getAllHeader = () => {
    return axios.get('/api/headers');
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

// banner

const getAllBanners = () => {
    return axios.get('/api/banners');
    // return axios.get('http://localhost:3002/api/get-all-banners');
}

// body

const getContentBodyById = (id) => {
    return axios.get(`/api/content-bodys/${id}`)
}

// form section

const getFormSectionById = (id) => {
    return axios.get(`/api/form-sections/${id}`)
}

const getAllTextInput = () => {
    return axios.get('/api/get-all-text-input')
}

// pack

const getAllPack = () => {
    return axios.get('/api/packs')
}

export {
    getAllBanners, getAllMenuItemByMenuId, getAllHeader,
    getAllTextInput, getFormSectionById, getAllPack,
    getContentBodyById, getAllCampaign, createHeader,
    deleteHeader, getAllMenu, createMenu, deleteMenu,
    updateMenu, createMenuItem, deleteMenuItem,
    updateMenuItem, createSubMenu
}