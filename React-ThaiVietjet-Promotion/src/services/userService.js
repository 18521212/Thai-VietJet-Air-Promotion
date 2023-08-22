import axios from "../axios";

//post banner

const getAllBanners = () => {
    return axios.get('/api/get-all-banners');
    // return axios.get('http://localhost:3002/api/get-all-banners');
}

const getAllHeader = () => {
    return axios.get('/api/get-all-header');
}

const getAllMenuItemById = (menuId) => {
    return axios.get(`/api/get-all-menu-item-by-id?menuId=${menuId}`)
}

export {
    getAllBanners, getAllMenuItemById, getAllHeader
}