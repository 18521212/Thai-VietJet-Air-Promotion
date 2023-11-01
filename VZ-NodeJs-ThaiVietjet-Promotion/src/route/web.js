import express from "express";
import campaignController from "../controllers/campaignController";
import homeController from "../controllers/homeController";
import bannerController from "../controllers/bannerController";
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

    // campaign
    router.post('/api/campaigns',validateAuth, campaignController.createCampaign);
    router.get('/api/campaigns/:id?', campaignController.getCampaign);
    router.put('/api/campaigns',validateAuth, campaignController.updateCampaign);
    router.delete('/api/campaigns',validateAuth, campaignController.deleteCampaign);

    // banner
    router.post(api.BANNERS, validateAuth, bannerController.createBanner);
    router.get(`${api.BANNERS}/:id?`, bannerController.getBanner);
    router.put(api.BANNERS, validateAuth, bannerController.updateBanner);
    router.delete(api.BANNERS, validateAuth, bannerController.deleteBanner);

    // header
    router.post(api.HEADERS, validateAuth, headerController.createHeader);
    router.get(`${api.HEADERS}/:id?`, headerController.getHeader);
    router.put(api.HEADERS, validateAuth, headerController.updateHeader);
    router.delete(api.HEADERS, validateAuth, headerController.deleteHeader);

    router.post(api.MENUS, validateAuth, headerController.createMenu)
    router.get(`${api.MENUS}/:id?`, headerController.getMenu)
    router.put(api.MENUS, validateAuth, headerController.updateMenu)
    router.delete(api.MENUS, validateAuth, headerController.deleteMenu)

    router.post('/api/menu-items', validateAuth, headerController.createMenuItem);
    router.get('/api/menu-items/menus/:id?', headerController.getAllMenuItemByMenuId);
    router.put('/api/menu-items', validateAuth, headerController.updateMenuItemById)
    router.delete('/api/menu-items', validateAuth, headerController.deleteMenuItemById)

    router.post('/api/sub-menus', validateAuth, headerController.createSubMenu);
    router.get('/api/sub-menus/menu-items/:id?', headerController.getAllSubMenuByMenuItemId);
    router.put('/api/sub-menus', validateAuth, headerController.updateSubMenu);
    router.delete('/api/sub-menus', validateAuth, headerController.deleteSubMenuById)


    // body
    router.post(api.BODYS, validateAuth, bodyController.createUpdateDeleteBody)
    router.get(`${api.BODYS}/:id?`, bodyController.getBody)
    router.put(api.BODYS, validateAuth, bodyController.createUpdateDeleteBody)
    router.delete(api.BODYS, validateAuth, bodyController.createUpdateDeleteBody)

    // form
    router.post(api.FORMS, validateAuth, formController.createUpdateDeleteForm)
    router.get(`${api.FORMS}/:id?`, formController.getForm)
    router.put(api.FORMS, validateAuth, formController.createUpdateDeleteForm)
    router.delete(api.FORMS, validateAuth, formController.createUpdateDeleteForm)

    // form detail

    router.get('/api/form-details', formController.getAllFormDetail)
    router.get('/api/form-details/forms/:formId', formController.getFormDetailByFormId)
    router.post('/api/form-details', validateAuth, formController.addInputIntoForm)
    router.put('/api/form-details', validateAuth, formController.updateFormDetail)
    router.delete('/api/form-details', validateAuth, formController.deleteFormDetail)

    // input
    router.get(`${api.INPUTS}/:id?`, formController.getInput)
    router.delete(api.INPUTS, validateAuth, formController.deleteInputById)

    // text input
    router.post(api.TEXT_INPUTS, validateAuth, formController.createTextInput)
    router.get(api.TEXT_INPUTS, formController.getAllTextInput)
    router.put(api.TEXT_INPUTS, validateAuth, formController.updateTextInput)

    // dropdown
    router.post(api.DROPDOWNS, validateAuth, formController.createUpdateDropdown)
    router.get(`${api.DROPDOWNS}/:id`, formController.getDropdownById)
    router.put(api.DROPDOWNS, validateAuth, formController.createUpdateDropdown)

    // data dropdown
    router.post(api.DATA_DROPDOWNS, validateAuth, formController.createDeleteDataDropdown)
    router.delete(api.DATA_DROPDOWNS, validateAuth, formController.createDeleteDataDropdown)

    // promotion
    router.post(api.PROMOTIONS, validateAuth, promotionController.createUpdateDeletePromotion)
    router.get(`${api.PROMOTIONS}/:id?`, promotionController.getPromotion)
    router.put(api.PROMOTIONS, validateAuth, promotionController.createUpdateDeletePromotion)
    router.delete(api.PROMOTIONS, validateAuth, promotionController.createUpdateDeletePromotion)

    // pack
    router.post(api.PACKS, validateAuth, promotionController.createUpdateDeletePack)
    router.get(`${api.PACKS}/:id?`, promotionController.getPack)
    router.put(api.PACKS, validateAuth, promotionController.createUpdateDeletePack)
    router.delete(api.PACKS, validateAuth, promotionController.createUpdateDeletePack)

    // router.post('/api/fetch-data', formController.fetchData) // danger

    // footer
    router.post(api.FOOTERS, validateAuth, footerController.createFooter)
    router.get(`${api.FOOTERS}/:id?`, footerController.getFooter)
    router.put(api.FOOTERS, validateAuth, footerController.updateFooter)
    router.delete(api.FOOTERS, validateAuth, footerController.deleteFooter)

    // footer text
    router.post('/api/footer-texts', validateAuth, footerController.createFooterText)
    router.get('/api/footer-texts/footers/:id', footerController.getAllFooterText)
    router.put('/api/footer-texts', validateAuth, footerController.updateFooterText)
    router.delete('/api/footer-texts', validateAuth, footerController.deleteFooterText)

    return app.use("/", router)
}

module.exports = initWebRoutes;