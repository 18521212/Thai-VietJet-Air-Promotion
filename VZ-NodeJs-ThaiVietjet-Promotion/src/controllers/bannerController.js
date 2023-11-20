import bannerService from '../services/bannerService';
import { resolveObj } from '../utils';
import { controller } from '../utils';

// banner
let createUpdateDeleteBanner = async (req, res) => {
    controller.SWITCH_CONTROLLER(req, res, {
        create: bannerService.createBanner,
        update: bannerService.updateBanner,
        delete: bannerService.deleteBanner
    })
}

let getBanner = async (req, res) => {
    controller.CONTROLLER(req, res, bannerService.getBanner, req?.params?.id)
}

// image banner

let createUpdateDeleteImageBanner = async (req, res) => {
    controller.SWITCH_CONTROLLER(req, res, {
        create: bannerService.createImageBanner,
        delete: bannerService.deleteImageBanner
    })
}

module.exports = {
    createUpdateDeleteBanner,
    getBanner,

    createUpdateDeleteImageBanner,
}