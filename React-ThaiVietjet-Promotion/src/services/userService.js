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

// form section

const getFormSectionById = (id) => {
    return axios.get(`/api/get-form-section-by-id?id=${id}`)
}

const getAllTextInput = () => {
    return axios.get('/api/get-all-text-input')
}

export {
    getAllBanners, getAllMenuItemById, getAllHeader,
    getAllTextInput, getFormSectionById
}