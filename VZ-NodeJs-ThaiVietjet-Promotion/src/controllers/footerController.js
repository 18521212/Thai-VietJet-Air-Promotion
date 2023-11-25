import footerService from '../services/footerService';
import { controller } from '../utils';

// footer

let createFooter = async (req, res) => {
    try {
        let data = await footerService.createFooter(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getFooter = async (req, res) => {
    controller.CONTROLLER(req, res, footerService.getFooter, req?.params?.id)
}

let updateFooter = async (req, res) => {
    try {
        let data = await footerService.updateFooter(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteFooter = async (req, res) => {
    try {
        let data = await footerService.deleteFooter(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// footer text

let createFooterText = async (req, res) => {
    try {
        let data = await footerService.createFooterText(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllFooterText = async (req, res) => {
    try {
        let data = await footerService.getAllFooterText(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateFooterText = async (req, res) => {
    try {
        let data = await footerService.updateFooterText(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteFooterText = async (req, res) => {
    try {
        let data = await footerService.deleteFooterText(req.body.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

//

let createUpdateDeleteMarkdown = async (req, res) => {
    controller.SWITCH_CONTROLLER(req, res, {
        create: footerService.createMarkdown,
        update: footerService.updateMarkdown,
        delete: footerService.deleteMarkdown
    })
}

let getMarkdown = async (req, res) => {
    controller.CONTROLLER(req, res, footerService.getMarkdown, req?.params?.id)

}

module.exports = {
    createFooter,
    getFooter,
    updateFooter,
    deleteFooter,

    createFooterText,
    getAllFooterText,
    updateFooterText,
    deleteFooterText,

    createUpdateDeleteMarkdown,
    getMarkdown
}