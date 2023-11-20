import express from "express";
import campaignController from "../controllers/campaignController";
import homeController from "../controllers/homeController";
import headerController from "../controllers/headerController";
import bodyController from "../controllers/bodyController";
import formController from "../controllers/formController";
import footerController from "../controllers/footerController";
import promotionController from '../controllers/promotionController'
import { api } from "../utils";
import axios from 'axios';
import { validateAuth } from "../auth/validateAuthen";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    // router.post('/api/fetch-data', formController.fetchData) // danger

    return app.use("/", router)
}

module.exports = initWebRoutes;