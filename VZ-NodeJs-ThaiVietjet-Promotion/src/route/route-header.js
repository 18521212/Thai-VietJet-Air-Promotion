import express from "express"
import { api } from "../utils"
import headerController from '../controllers/headerController'
import { validateAuth } from "../auth/validateAuthen"

const router = express.Router()

let routeHeader = (app) => {
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

    return app.use('/', router)
}

module.exports = routeHeader;