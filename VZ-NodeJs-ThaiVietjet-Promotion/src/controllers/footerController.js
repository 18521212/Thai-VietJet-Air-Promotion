import footerService from '../services/footerService';
import { controller, resolveObj } from '../utils';

// footer

let createFooter = async (req, res, next) => {
    try {
        let data = await footerService.createFooter(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getFooter = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, footerService.getFooter, req?.params)
}

let updateFooter = async (req, res, next) => {
    try {
        let data = await footerService.updateFooter(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let deleteFooter = async (req, res, next) => {
    try {
        let data = await footerService.deleteFooter(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

// footer text

let createFooterText = async (req, res, next) => {
    try {
        let data = await footerService.createFooterText(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getAllFooterText = async (req, res, next) => {
    try {
        let data = await footerService.getAllFooterText(req.params.id);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let updateFooterText = async (req, res, next) => {
    try {
        let data = await footerService.updateFooterText(req.body);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let deleteFooterText = async (req, res, next) => {
    try {
        let data = await footerService.deleteFooterText(req.body.id);
        res.data = data
        return res.status(200).json(res.data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

// markdown

let createUpdateDeleteMarkdown = async (req, res, next) => {
    controller.SWITCH_CONTROLLER(req, res, next, {
        create: footerService.createMarkdown,
        update: footerService.updateMarkdown,
        delete: footerService.deleteMarkdown
    })
}

let getMarkdown = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, footerService.getMarkdown, req?.params?.id)

}

// FAQ

let createUpdateDeleteFAQ = async (req, res, next) => {
    controller.SWITCH_CONTROLLER(req, res, next, {
        create: footerService.createFAQ,
        update: footerService.updateFAQ,
        delete: footerService.deleteFAQ
    })
}

let getFAQ = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, footerService.getFAQ, req?.params)

}

// FAQ Question

let createUpdateDeleteFAQQuestion = async (req, res, next) => {
    controller.SWITCH_CONTROLLER(req, res, next, {
        create: footerService.createFAQQuestion,
        update: footerService.updateFAQQuestion,
        delete: footerService.deleteFAQQuestion
    })
}

let getFAQQuestion = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, footerService.getFAQQuestion, req?.params)

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
    getMarkdown,

    createUpdateDeleteFAQ,
    getFAQ,

    createUpdateDeleteFAQQuestion,
    getFAQQuestion,
}