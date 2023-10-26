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

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    // campaign
    router.post('/api/campaigns', campaignController.createCampaign);
    router.get('/api/campaigns/:id?', campaignController.getCampaign);
    router.put('/api/campaigns', campaignController.updateCampaign);
    router.delete('/api/campaigns', campaignController.deleteCampaign);

    // banner
    router.post(api.BANNERS, bannerController.createBanner);
    router.get(`${api.BANNERS}/:id?`, bannerController.getBanner);
    router.put(api.BANNERS, bannerController.updateBanner);
    router.delete(api.BANNERS, bannerController.deleteBanner);

    // header
    router.post(api.HEADERS, headerController.createHeader);
    router.get(`${api.HEADERS}/:id?`, headerController.getHeader);
    router.put(api.HEADERS, headerController.updateHeader);
    router.delete(api.HEADERS, headerController.deleteHeader);

    router.post(api.MENUS, headerController.createMenu)
    router.get(`${api.MENUS}/:id?`, headerController.getMenu)
    router.put(api.MENUS, headerController.updateMenu)
    router.delete(api.MENUS, headerController.deleteMenu)

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
    router.get(`${api.BODYS}/:id?`, bodyController.getBody)
    router.put(api.BODYS, bodyController.createUpdateDeleteBody)
    router.delete(api.BODYS, bodyController.createUpdateDeleteBody)

    // form
    router.post(api.FORMS, formController.createUpdateDeleteForm)
    router.get(`${api.FORMS}/:id?`, formController.getForm)
    router.put(api.FORMS, formController.createUpdateDeleteForm)
    router.delete(api.FORMS, formController.createUpdateDeleteForm)

    // form detail

    router.get('/api/form-details', formController.getAllFormDetail)
    router.get('/api/form-details/forms/:formId', formController.getFormDetailByFormId)
    router.post('/api/form-details', formController.addInputIntoForm)
    router.put('/api/form-details', formController.updateFormDetail)
    router.delete('/api/form-details', formController.deleteFormDetail)

    // input
    router.get(`${api.INPUTS}/:id?`, formController.getInput)
    router.delete(api.INPUTS, formController.deleteInputById)

    // text input
    router.post(api.TEXT_INPUTS, formController.createTextInput)
    router.get(api.TEXT_INPUTS, formController.getAllTextInput)
    router.put(api.TEXT_INPUTS, formController.updateTextInput)

    // dropdown
    router.post(api.DROPDOWNS, formController.createUpdateDropdown)
    router.get(`${api.DROPDOWNS}/:id`, formController.getDropdownById)
    router.put(api.DROPDOWNS, formController.createUpdateDropdown)

    // data dropdown
    router.post(api.DATA_DROPDOWNS, formController.createDeleteDataDropdown)
    router.delete(api.DATA_DROPDOWNS, formController.createDeleteDataDropdown)

    // promotion
    router.post(api.PROMOTIONS, promotionController.createUpdateDeletePromotion)
    router.get(`${api.PROMOTIONS}/:id?`, promotionController.getPromotion)
    router.put(api.PROMOTIONS, promotionController.createUpdateDeletePromotion)
    router.delete(api.PROMOTIONS, promotionController.createUpdateDeletePromotion)

    // pack
    router.post(api.PACKS, promotionController.createUpdateDeletePack)
    router.get(`${api.PACKS}/:id?`, promotionController.getPack)
    router.put(api.PACKS, promotionController.createUpdateDeletePack)
    router.delete(api.PACKS, promotionController.createUpdateDeletePack)

    router.post('/api/fetch-data', formController.fetchData)

    // footer
    router.post(api.FOOTERS, footerController.createFooter)
    router.get(`${api.FOOTERS}/:id?`, footerController.getFooter)
    router.put(api.FOOTERS, footerController.updateFooter)
    router.delete(api.FOOTERS, footerController.deleteFooter)

    // footer text
    router.post('/api/footer-texts', footerController.createFooterText)
    router.get('/api/footer-texts/footers/:id', footerController.getAllFooterText)
    router.put('/api/footer-texts', footerController.updateFooterText)
    router.delete('/api/footer-texts', footerController.deleteFooterText)

    return app.use("/", router)
}

module.exports = initWebRoutes;