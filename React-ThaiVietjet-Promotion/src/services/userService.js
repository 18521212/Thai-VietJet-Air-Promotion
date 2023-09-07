import axios from "../axios";

// header 

const getAllHeader = () => {
    return axios.get('/api/get-all-header');
}

const getAllMenuItemById = (menuId) => {
    return axios.get(`/api/get-all-menu-item-by-menu-id?menuId=${menuId}`)
}

// banner

const getAllBanners = () => {
    return axios.get('/api/get-all-banners');
    // return axios.get('http://localhost:3002/api/get-all-banners');
}

// body

const getContentBodyById = (id) => {
    return axios.get(`/api/content-body/${id}`)
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
    getAllBanners, getAllMenuItemById, getAllHeader,
    getAllTextInput, getFormSectionById, getAllPack,
    getContentBodyById
}