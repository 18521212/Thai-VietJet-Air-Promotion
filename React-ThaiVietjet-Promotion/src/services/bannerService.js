import { api } from "utils";
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
    return deleteData(api.BANNERS, data.id)
}

export {
    createBanner,
    getBanner,
    updateBanner,
    deleteBanner
}