import express from "express";
import homeController from "../controllers/homeController";
import bannerController from "../controllers/bannerController";
import headerController from "../controllers/headerController";
import formController from "../controllers/formController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    // banner
    router.post('/api/create-banner', bannerController.createBanner);
    router.get('/api/get-all-banners', bannerController.getAllBanner);


    // header
    router.post('/api/create-header', headerController.createHeader);
    router.get('/api/get-all-header', headerController.getAllHeader);

    router.post('/api/create-menu-item', headerController.createMenuItem);
    router.get('/api/get-all-menu-item-by-menu-id', headerController.getAllMenuItemByMenuId);

    router.post('/api/create-sub-menu', headerController.createSubMenu);

    // form section
    router.post('/api/create-form-section', formController.createFormSection);
    router.get('/api/get-all-form-section', formController.getAllFormSection);
    router.get('/api/get-form-section-by-id', formController.getFormSectionById);

    router.post('/api/create-form', formController.createForm)
    router.get('/api/get-all-form', formController.getAllForm)

    router.get('/api/get-all-form-detail', formController.getAllFormDetail)
    router.post('/api/create-form-detail', formController.addInputIntoForm)
    router.post('/api/update-form-detail', formController.updateFormDetail)
    router.post('/api/delete-form-detail', formController.deleteFormDetail)

    router.get('/api/get-all-input', formController.getAllInput)
    router.post('/api/delete-input-by-id', formController.deleteInputById)

    router.post('/api/create-text-input', formController.createTextInput)
    router.get('/api/get-all-text-input', formController.getAllTextInput)

    router.post('/api/create-dropdown', formController.createDropdown)
    router.get('/api/get-dropdown-by-id', formController.getDropdownById)
    router.post('/api/create-row-data-dropdown', formController.createRowDataDropdown)
    // delete dropdown // delete data dropdown

    router.post('/api/create-pack', formController.createPack)
    router.get('/api/get-all-pack', formController.getAllPack)

    return app.use("/", router) //su dung tat ca fie router ma chung ta khai bao
}

module.exports = initWebRoutes;