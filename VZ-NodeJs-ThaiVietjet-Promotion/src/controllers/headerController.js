import headerService from '../services/headerService';
import { controller, resolveObj } from '../utils';

// header

let createHeader = async (req, res, next) => {
    try {
        let data = await headerService.createHeader(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getHeader = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, headerService.getHeader, req?.params?.id)
}

let updateHeader = async (req, res, next) => {
    try {
        let data = await headerService.updateHeader(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let deleteHeader = async (req, res, next) => {
    try {
        let data = await headerService.deleteHeader(req.body.id);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

// menu

let createMenu = async (req, res, next) => {
    try {
        let data = await headerService.createMenu(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getMenu = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, headerService.getMenu, req?.params?.id)
}

let updateMenu = async (req, res, next) => {
    try {
        let data = await headerService.updateMenu(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let deleteMenu = async (req, res, next) => {
    try {
        let data = await headerService.deleteMenu(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

// menu item

let createMenuItem = async (req, res, next) => {
    try {
        let data = await headerService.createMenuItem(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getAllMenuItemByMenuId = async (req, res, next) => {
    try {
        let data = await headerService.getAllMenuItemByMenuId(req.params.id);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let updateMenuItemById = async (req, res, next) => {
    try {
        let data = await headerService.updateMenuItemById(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let deleteMenuItemById = async (req, res, next) => {
    try {
        let data = await headerService.deleteMenuItemById(req.body.id);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

// sub menu

let createSubMenu = async (req, res, next) => {
    try {
        let data = await headerService.createSubMenu(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getAllSubMenuByMenuItemId = async (req, res, next) => {
    try {
        let data = await headerService.getAllSubMenuByMenuItemId(req.params.id);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let updateSubMenu = async (req, res, next) => {
    try {
        let data = await headerService.updateSubMenu(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let deleteSubMenuById = async (req, res) => {
    try {
        let data = await headerService.deleteSubMenuById(req.body.id);
        res.data=data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

module.exports = {
    createHeader,
    getHeader,
    deleteHeader,
    updateHeader,

    createMenu,
    getMenu,
    updateMenu,
    deleteMenu,

    createMenuItem,
    getAllMenuItemByMenuId,
    updateMenuItemById,
    deleteMenuItemById,

    createSubMenu,
    getAllSubMenuByMenuItemId,
    updateSubMenu,
    deleteSubMenuById,
}