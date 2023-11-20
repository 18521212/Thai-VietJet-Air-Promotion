import express from "express";
import { api } from "../utils";
import bannerController from "../controllers/bannerController";
import { validateAuth } from "../auth/validateAuthen";

const router = express.Router()

let routeBanner = (app) => {
    // banner
    router.post('', validateAuth, bannerController.createBanner);
    router.get(`/:id?`, bannerController.getBanner);
    router.put('', validateAuth, bannerController.updateBanner);
    router.delete('', validateAuth, bannerController.deleteBanner);

    return app.use(api.BANNERS, router)
}


module.exports = routeBanner;