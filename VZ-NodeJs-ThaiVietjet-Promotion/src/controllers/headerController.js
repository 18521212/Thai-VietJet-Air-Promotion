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

let createSubMenu = async (req, res) => {
    try {
        console.log(req.body)
        let data = await headerService.createSubMenu(req.body);
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

module.exports = {
    createHeader: createHeader,
    getAllHeader: getAllHeader,

    createMenuItem: createMenuItem,
    getAllMenuItemByMenuId: getAllMenuItemByMenuId,

    createSubMenu: createSubMenu
}