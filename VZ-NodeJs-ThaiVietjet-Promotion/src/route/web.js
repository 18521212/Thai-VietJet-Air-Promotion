import express from "express";
import campaignController from "../controllers/campaignController";
import homeController from "../controllers/homeController";
import bannerController from "../controllers/bannerController";
import headerController from "../controllers/headerController";
import bodyController from "../controllers/bodyController";
import formController from "../controllers/formController";
import footerController from "../controllers/footerController";
import { api } from "../utils";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    // campaign
    router.post('/api/campaigns', campaignController.createCampaign);
    router.get('/api/campaigns/:id?', campaignController.getCampaign);
    router.put('/api/campaigns', campaignController.updateCampaign);
    router.delete('/api/campaigns', campaignController.deleteCampaign);

    // banner
    router.post('/api/banners', bannerController.createBanner);
    router.get('/api/banners/:id?', bannerController.getBanner);
    router.put('/api/banners', bannerController.updateBanner);
    router.delete('/api/banners', bannerController.deleteBanner);

    // header
    router.post('/api/headers', headerController.createHeader);
    router.get('/api/headers', headerController.getAllHeader);
    router.put('/api/headers', headerController.updateHeader);
    router.delete('/api/headers', headerController.deleteHeader);

    router.post('/api/menus', headerController.createMenu)
    router.get('/api/menus/:id?', headerController.getAllMenu)
    router.put('/api/menus', headerController.updateMenu)
    router.delete('/api/menus', headerController.deleteMenu)

    router.post('/api/menu-items', headerController.createMenuItem);
    router.get('/api/menu-items/menus/:id?', headerController.getAllMenuItemByMenuId);
    router.put('/api/menu-items', headerController.updateMenuItemById)
    router.delete('/api/menu-items', headerController.deleteMenuItemById)

    router.post('/api/sub-menus', headerController.createSubMenu);
    router.get('/api/sub-menus/menu-items/:id?', headerController.getAllSubMenuByMenuItemId);
    router.put('/api/sub-menus', headerController.updateSubMenu);
    router.delete('/api/sub-menus', headerController.deleteSubMenuById)


    // body
    router.post(api.BODYS, bodyController.createUpdateDeleteBody)
    router.get('/api/bodies/:id?', bodyController.getBody)
    router.put(api.BODYS, bodyController.createUpdateDeleteBody)
    router.delete(api.BODYS, bodyController.createUpdateDeleteBody)

    // form
    router.post('/api/forms', formController.createUpdateDeleteForm)
    router.get('/api/forms/:id?', formController.getForm)
    router.put('/api/forms', formController.createUpdateDeleteForm)
    router.delete('/api/forms', formController.createUpdateDeleteForm)

    // form detail
    
    router.get('/api/form-details', formController.getAllFormDetail)
    router.get('/api/form-details/forms/:formId', formController.getFormDetailByFormId)
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

    // footer
    router.post('/api/footers', footerController.createFooter)
    router.get('/api/footers/:id?', footerController.getFooter)
    router.put('/api/footers', footerController.updateFooter)
    router.delete('/api/footers', footerController.deleteFooter)

    // footer text
    router.post('/api/footer-texts', footerController.createFooterText)
    router.get('/api/footer-texts/footers/:id', footerController.getAllFooterText)
    router.put('/api/footer-texts', footerController.updateFooterText)
    router.delete('/api/footer-texts', footerController.deleteFooterText)

    return app.use("/", router) //su dung tat ca fie router ma chung ta khai bao
}

module.exports = initWebRoutes;