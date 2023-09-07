import express from "express";
import homeController from "../controllers/homeController";
import bannerController from "../controllers/bannerController";
import headerController from "../controllers/headerController";
import bodyController from "../controllers/bodyController";
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
    router.post('/api/update-menu-item-by-id', headerController.updateMenuItemById)
    router.post('/api/delete-menu-item-by-id', headerController.deleteMenuItemById)

    router.post('/api/create-sub-menu', headerController.createSubMenu);
    router.post('/api/delete-sub-menu-by-id', headerController.deleteSubMenuById)

    // body
    router.get('/api/content-body/:id', bodyController.getContentBodyById)

    // form section
    router.post('/api/form-sections', formController.createFormSection);
    router.get('/api/form-sections', formController.getAllFormSection);
    router.get('/api/form-sections/:id', formController.getFormSectionById);

    router.post('/api/forms', formController.createForm)
    router.get('/api/forms', formController.getAllForm)

    router.get('/api/form-details', formController.getAllFormDetail)
    router.post('/api/form-details', formController.addInputIntoForm)
    router.put('/api/form-details', formController.updateFormDetail)
    router.delete('/api/form-details', formController.deleteFormDetail)

    router.get('/api/inputs', formController.getAllInput)
    router.delete('/api/inputs/:id', formController.deleteInputById)

    router.post('/api/text-inputs', formController.createTextInput)
    router.get('/api/text-inputs', formController.getAllTextInput)

    router.post('/api/dropdowns', formController.createDropdown)
    router.get('/api/dropdowns/:id', formController.getDropdownById)
    router.post('/api/row-dataset-dropdowns', formController.createRowDataDropdown)
    // delete dropdown // delete data dropdown

    router.post('/api/packs', formController.createPack)
    router.get('/api/packs', formController.getAllPack)
    router.delete('/api/packs/:id', formController.deletePackById)

    router.post('/api/fetch-data', formController.fetchData)

    return app.use("/", router) //su dung tat ca fie router ma chung ta khai bao
}

module.exports = initWebRoutes;