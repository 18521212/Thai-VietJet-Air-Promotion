import express from "express";
import homeController from "../controllers/homeController";
import bannerController from "../controllers/bannerController";
import headerController from "../controllers/headerController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    router.post('/api/create-banner', bannerController.createBanner);
    router.get('/api/get-all-banners', bannerController.getAllBanner);


    //header
    router.post('/api/create-header', headerController.createHeader);
    router.get('/api/get-all-header', headerController.getAllHeader);

    router.post('/api/create-menu-item', headerController.createMenuItem);
    router.get('/api/get-all-menu-item-by-id', headerController.getAllMenuItemByMenuId);

    router.post('/api/create-sub-menu', headerController.createSubMenu);

    return app.use("/", router) //su dung tat ca fie router ma chung ta khai bao
}

module.exports = initWebRoutes;