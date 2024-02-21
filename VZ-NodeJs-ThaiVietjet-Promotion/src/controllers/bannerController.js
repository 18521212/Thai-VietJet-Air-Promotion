import bannerService from '../services/bannerService';
import { resolveObj } from '../utils';
import { controller } from '../utils';

// banner
let createUpdateDeleteBanner = async (req, res, next) => {
    controller.SWITCH_CONTROLLER(req, res, next, {
        create: bannerService.createBanner,
        update: bannerService.updateBanner,
        delete: bannerService.deleteBanner
    })
}

let getBanner = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, bannerService.getBanner, req?.params?.id)
}

let createImageBanner = async (req, res, next) => {
    try {
        let _validate_image = await bannerService.validateImage(req.body.image, req.body.type)
        if (_validate_image.errCode != 0) {
            res.data=_validate_image
            return res.status(200).json(_validate_image)
        } else {
            let _create_image = await bannerService.createImageBanner(req.body)
            res.data = _create_image
            return res.status(200).json(res?.data)
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let createUpdateDeleteImageBanner = async (req, res, next) => {
    controller.SWITCH_CONTROLLER(req, res, next, {
        delete: bannerService.deleteImageBanner
    })
}

module.exports = {
    createUpdateDeleteBanner,
    getBanner,

    createImageBanner,
    createUpdateDeleteImageBanner,
}