import headerService from '../services/headerService';
import { controller, resolveObj } from '../utils';

// header

let createHeader = async (req, res, next) => {
    try {
        let data = await headerService.createHeader(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getHeader = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, headerService.getHeader, req?.params?.id)
}

let updateHeader = async (req, res, next) => {
    try {
        let data = await headerService.updateHeader(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteHeader = async (req, res, next) => {
    try {
        let data = await headerService.deleteHeader(req.body.id);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// menu

let createMenu = async (req, res, next) => {
    try {
        let data = await headerService.createMenu(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getMenu = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, headerService.getMenu, req?.params?.id)
}

let updateMenu = async (req, res, next) => {
    try {
        let data = await headerService.updateMenu(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteMenu = async (req, res, next) => {
    try {
        let data = await headerService.deleteMenu(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// menu item

let createMenuItem = async (req, res, next) => {
    try {
        let data = await headerService.createMenuItem(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllMenuItemByMenuId = async (req, res, next) => {
    try {
        let data = await headerService.getAllMenuItemByMenuId(req.params.id);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateMenuItemById = async (req, res, next) => {
    try {
        let data = await headerService.updateMenuItemById(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteMenuItemById = async (req, res, next) => {
    try {
        let data = await headerService.deleteMenuItemById(req.body.id);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// sub menu

let createSubMenu = async (req, res, next) => {
    try {
        let data = await headerService.createSubMenu(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllSubMenuByMenuItemId = async (req, res, next) => {
    try {
        let data = await headerService.getAllSubMenuByMenuItemId(req.params.id);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateSubMenu = async (req, res, next) => {
    try {
        let data = await headerService.updateSubMenu(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteSubMenuById = async (req, res) => {
    try {
        let data = await headerService.deleteSubMenuById(req.body.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createHeader: createHeader,
    getHeader: getHeader,
    deleteHeader: deleteHeader,
    updateHeader: updateHeader,

    createMenu: createMenu,
    getMenu,
    updateMenu: updateMenu,
    deleteMenu: deleteMenu,

    createMenuItem: createMenuItem,
    getAllMenuItemByMenuId: getAllMenuItemByMenuId,
    updateMenuItemById: updateMenuItemById,
    deleteMenuItemById: deleteMenuItemById,

    createSubMenu: createSubMenu,
    getAllSubMenuByMenuItemId: getAllSubMenuByMenuItemId,
    updateSubMenu: updateSubMenu,
    deleteSubMenuById: deleteSubMenuById,
}