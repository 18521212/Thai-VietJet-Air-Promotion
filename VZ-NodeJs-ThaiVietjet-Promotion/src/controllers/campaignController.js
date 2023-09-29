import campaignService from '../services/campaignService';

let createCampaign = async (req, res) => {
    try {
        let data = await campaignService.createCampaign(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getCampaign = async (req, res) => {
    try {
        let data
        if (!req.params.id) {
            data = await campaignService.getAllCampaign();
        } else {
            data = await campaignService.getCampaignById(req.params.id);
        }
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateCampaign = async (req, res) => {
    try {
        let data = await campaignService.updateCampaign(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteCampaign = async (req, res) => {
    try {
        let data = await campaignService.deleteCampaign(req.body.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getCampaign: getCampaign,
    createCampaign: createCampaign,
    updateCampaign: updateCampaign,
    deleteCampaign: deleteCampaign
}