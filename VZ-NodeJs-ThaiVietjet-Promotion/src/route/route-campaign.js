import express from "express";
import { api } from "../utils";
import campaignController from '../controllers/campaignController';
import { validateAuth } from "../auth/validateAuthen";

const router = express.Router()

let routeCampaign = (app) => {
    // campaign
    router.post('', validateAuth, campaignController.createCampaign);
    router.get('/:id?', campaignController.getCampaign);
    router.put('', validateAuth, campaignController.updateCampaign);
    router.delete('', validateAuth, campaignController.deleteCampaign);

    return app.use(api.CAMPAIGNS, router)
}

module.exports = routeCampaign;
