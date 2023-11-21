import { api, route } from "utils";
import { create, get, update, deleteData } from 'services/constantService'

// banner
const createBanner = (data) => {
    return create(api.BANNERS, data)
}

const getBanner = (id) => {
    return get(api.BANNERS, id)
}

const updateBanner = (data) => {
    return update(api.BANNERS, data)
}

const deleteBanner = (data) => {
    return deleteData(api.BANNERS, data)
}

const createImageBanner = (data) => {
    return create(`${api.BANNERS}${route.IMAGE_BANNERS}`, data)
}

const deleteImageBanner = (data) => {
    return deleteData(`${api.BANNERS}${route.IMAGE_BANNERS}`, data)
}

export {
    createBanner,
    getBanner,
    updateBanner,
    deleteBanner,

    createImageBanner,
    deleteImageBanner,
}