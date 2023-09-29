import bannerService from '../services/bannerService';
import { resolveObj } from '../utils';

// banner
let createBanner = async (req, res) => {
    try {
        let data = await bannerService.createBanner(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllBanner = async (req, res) => {
    try {
        let data = await bannerService.getAllBanner();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateBanner = async (req, res) => {
    try {
        let data = await bannerService.updateBanner(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let deleteBanner = async (req, res) => {
    try {
        let data = await bannerService.deleteBanner(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// image banner

let addImageBanner = async (req, res) => {
    try {
        let data = await bannerService.addImageBanner(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteImageBanner = async (req, res) => {
    try {
        let data = await bannerService.deleteImageBanner(req.body);
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
    createBanner: createBanner,
    getAllBanner: getAllBanner,
    updateBanner: updateBanner,
    deleteBanner: deleteBanner,

    addImageBanner: addImageBanner,
    deleteImageBanner: deleteImageBanner,
}