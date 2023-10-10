import { toast } from "react-toastify";
import axios from "../axios";
import { api } from "utils";

// CRUD

const create = (link, data) => {
    return axios.post(link, data)
}

const get = (link, id) => {
    if (id) {
        return axios.get(`${link}/${id}`)
    } else {
        return axios.get(`${link}`)
    }
}

const update = (link, data) => {
    return axios.put(link, data)
}

const deleteData = (link, id) => {
    return axios.delete(link, {
        data: {
            ['id']: id
        }
    })
}

// campaign

const createCampaign = (data) => {
    return create(api.CAMPAIGNS, data)
}

const getCampaign = (id) => {
    return get(api.CAMPAIGNS, id)
}

const updateCampaign = (data) => {
    return update(api.CAMPAIGNS, data)
}

const deleteCampaign = (data) => {
    return deleteData(api.CAMPAIGNS, data.id)
}

// header 
const createHeader = (data) => {
    console.log('cre he se')
    return create('/api/headers', data)
}

const getAllHeader = () => {
    return axios.get('/api/headers');
}

const updateHeader = (data) => {
    return axios.put('/api/headers', data);
}

const deleteHeader = (id) => {
    return deleteData('/api/headers', id)
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

const createBanner = (data) => {
    return create(api.BANNERS, data)
}

const getBanners = (id) => {
    return get(api.BANNERS, id)
}

const updateBanner = (data) => {
    return update(api.BANNERS, data)
}

const deleteBanner = (data) => {
    return deleteData(api.BANNERS, data.id)
}

// body

const createBody = (data) => {
    return create(api.BODYS, data)
}

const getBody = (id) => {
    return get(api.BODYS, id)
}

const updateBody = (data) => {
    return update(api.BODYS, data)
}

const deleteBody = (data) => {
    return deleteData(api.BODYS, data.id)
}

// form

const createForm = (data) => {
    return create(api.FORMS, data)
}

const getForm = (id) => {
    if (id) {
        return axios.get(`/api/forms/${id}`)
    } else {
        return axios.get(`/api/forms`)
    }
}

const getAllInput = (id) => {
    return get(api.INPUTS, id)
}

const getAllTextInput = () => {
    return axios.get('/api/get-all-text-input')
}

const updateForm = (data) => {
    return update(api.FORMS, data)
}

const deleteForm = (data) => {
    return deleteData(api.FORMS, data.id)
}

// form detail

const createFormDetail = (data) => {
    return create(api.FORM_DETAILS, data)
}

const getFormDetailByFormId = (formId) => {
    return get(`${api.FORM_DETAILS}/forms/${formId}`)
}

const deleteFormDetail = (data) => {
    return deleteData(api.FORM_DETAILS, data.id)
}

// footer

const createFooter = (data) => {
    return create(api.FOOTERS, data)
}

const getFooter = (id) => {
    if (id) {
        return axios.get(`/api/footers/${id}`)
    } else {
        return axios.get(`/api/footers`)
    }
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
    return axios.get(api.FOOTER_TEXTS + `/footers/${id}`)
}

const updateFooterText = (data) => {
    return update(api.FOOTER_TEXTS, data)
}

const deleteFooterText = (data) => {
    return deleteData(api.FOOTER_TEXTS, data.id)
}

// pack

const getAllPack = () => {
    return axios.get('/api/packs')
}

export {
    getAllMenuItemByMenuId, getAllHeader,
    getAllTextInput, getAllPack,
    getBody, createHeader,
    deleteHeader, getAllMenu, createMenu, deleteMenu,
    updateMenu, createMenuItem, deleteMenuItem,
    updateMenuItem, createSubMenu, getAllSubMenuByMenuItemId,
    deleteSubMenu, updateSubMenu, updateHeader,
    getCampaign, getForm, getFooter, updateCampaign,
    createCampaign, deleteCampaign, getBanners,
    createBanner, deleteBanner, updateBanner,
    createBody, updateBody, deleteBody,
    createFooter, updateFooter, deleteFooter,
    createFooterText, getFooterText, deleteFooterText,
    updateFooterText, createForm, deleteForm,
    updateForm, getFormDetailByFormId, getAllInput,
    createFormDetail, deleteFormDetail
}