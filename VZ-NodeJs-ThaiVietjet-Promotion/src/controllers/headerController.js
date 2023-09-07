import headerService from '../services/headerService';

let createHeader = async (req, res) => {
    try {
        let data = await headerService.createHeader(req.body);
        return res.status(200).json({
            data
        })
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllHeader = async (req, res) => {
    try {
        let data = await headerService.getAllHeader();
        return res.status(200).json({
            data
        })
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
        return res.status(200).json({
            data
        })
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
        let data = await headerService.getAllMenuItemByMenuId(req.query.menuId);
        return res.status(200).json({
            data
        })
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
    getAllHeader: getAllHeader,

    createMenuItem: createMenuItem,
    getAllMenuItemByMenuId: getAllMenuItemByMenuId,
    updateMenuItemById: updateMenuItemById,
    deleteMenuItemById: deleteMenuItemById,

    createSubMenu: createSubMenu,
    deleteSubMenuById: deleteSubMenuById,
}