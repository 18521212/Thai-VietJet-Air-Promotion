import { toast } from "react-toastify";
import axios from "../axios";
import { api } from "utils";
import { create, get, update, deleteData } from 'services/constantService'

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
    return deleteData(api.CAMPAIGNS, data)
}

// pack

const getAllPack = () => {
    return axios.get('/api/packs')
}

export {
    getAllPack,
    getCampaign, updateCampaign,
    createCampaign, deleteCampaign,
}