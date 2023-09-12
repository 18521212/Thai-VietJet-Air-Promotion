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

const getAllMenu = () => {
    return axios.get('/api/menus')
}

// menu item

const getAllMenuItemByMenuId = (menuId) => {
    return axios.get(`/api/menu-items/menus/${menuId}`)
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
    deleteHeader, getAllMenu
}