import express from "express";
import { api, route } from "../utils";
import paymentController from "../controllers/paymentController";
import { validateAuth } from "../auth/validateAuthen";

const router = express.Router()

let routeDatafeed = (app) => {
    // banner
    // router.post('', paymentController.dataFeed);
    router.get('', paymentController.dataFeed);

    return app.use('/datafeed', router)
}

module.exports = routeDatafeed;