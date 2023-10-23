import headerService from '../services/headerService';
import { controller, resolveObj } from '../utils';

// header

let createHeader = async (req, res) => {
    try {
        let data = await headerService.createHeader(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getHeader = async (req, res) => {
    controller.CONTROLLER(req, res, headerService.getHeader, req?.params?.id)
}

let updateHeader = async (req, res) => {
    try {
        let data = await headerService.updateHeader(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteHeader = async (req, res) => {
    try {
        let data = await headerService.deleteHeader(req.body.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// menu

let createMenu = async (req, res) => {
    try {
        let data = await headerService.createMenu(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getMenu = async (req, res) => {
    controller.CONTROLLER(req, res, headerService.getMenu, req?.params?.id)
}

let updateMenu = async (req, res) => {
    try {
        let data = await headerService.updateMenu(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteMenu = async (req, res) => {
    try {
        let data = await headerService.deleteMenu(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// menu item

let createMenuItem = async (req, res) => {
    try {
        let data = await headerService.createMenuItem(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllMenuItemByMenuId = async (req, res) => {
    try {
        let data = await headerService.getAllMenuItemByMenuId(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateMenuItemById = async (req, res) => {
    try {
        let data = await headerService.updateMenuItemById(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteMenuItemById = async (req, res) => {
    try {
        let data = await headerService.deleteMenuItemById(req.body.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// sub menu

let createSubMenu = async (req, res) => {
    try {
        let data = await headerService.createSubMenu(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllSubMenuByMenuItemId = async (req, res) => {
    try {
        let data = await headerService.getAllSubMenuByMenuItemId(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateSubMenu = async (req, res) => {
    try {
        let data = await headerService.updateSubMenu(req.body);
        return res.status(200).json(data)
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