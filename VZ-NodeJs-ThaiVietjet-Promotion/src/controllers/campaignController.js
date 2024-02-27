import campaignService from '../services/campaignService';
import { resolveObj } from '../utils';

let createCampaign = async (req, res, next) => {
    try {
        let data = await campaignService.createCampaign(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getCampaign = async (req, res, next) => {
    try {
        let data
        data = await campaignService.getCampaign(req.params?.id)
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let updateCampaign = async (req, res, next) => {
    try {
        let data = await campaignService.updateCampaign(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let deleteCampaign = async (req, res, next) => {
    try {
        let data = await campaignService.deleteCampaign(req.body.id);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

module.exports = {
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign
}