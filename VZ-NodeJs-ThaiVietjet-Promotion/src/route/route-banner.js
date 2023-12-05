import express from "express";
import { api, route } from "../utils";
import bannerController from "../controllers/bannerController";
import { validateAuth } from "../auth/validateAuthen";

const router = express.Router()

let routeBanner = (app) => {
    // banner
    router.post('', validateAuth, bannerController.createUpdateDeleteBanner);
    router.get(`/:id?`, bannerController.getBanner);
    router.put('', validateAuth, bannerController.createUpdateDeleteBanner);
    router.delete('', validateAuth, bannerController.createUpdateDeleteBanner);

    router.post(route.IMAGE_BANNERS,
        validateAuth,
        bannerController.validateImage,
        bannerController.createUpdateDeleteImageBanner
    )
    router.delete(route.IMAGE_BANNERS, validateAuth, bannerController.createUpdateDeleteImageBanner)

    return app.use(api.BANNERS, router)
}


module.exports = routeBanner;