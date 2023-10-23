import { toast } from "react-toastify";
import axios from "../axios";
import { api } from "utils";
import { create, get, update, deleteData } from 'services/constantService'

// promotion
const createPromotion = (data) => {
    return create(api.PROMOTIONS, data)
}

const getPromotion = (id) => {
    return get(api.PROMOTIONS, id)
}

const updatePromotion = (data) => {
    return update(api.PROMOTIONS, data)
}

const deletePromotion = (data) => {
    return deleteData(api.PROMOTIONS, data.id)
}

// pack
const createPack = (data) => {
    return create(api.PACKS, data)
}

const getPack = (id) => {
    return get(api.PACKS, id)
}

const updatePack = (data) => {
    return update(api.PACKS, data)
}

const deletePack = (data) => {
    return deleteData(api.PACKS, data.id)
}

export {
    // promotion
    createPromotion,
    getPromotion,
    updatePromotion,
    deletePromotion,

    // pack
    createPack,
    getPack,
    updatePack,
    deletePack,
}