import bannerService from '../services/bannerService';
import { resolveObj } from '../utils';
import { controller } from '../utils';
const sharp = require('sharp');

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

// validate image

let configImage = {
    mobile: { width: 1040, height: 1040 },
    desktop: { width: 1920, height: 520 },
}

let validateImage = async (req, res, next) => {
    try {
        let valid = false
        let typeImage = req.body.type
        let base64String = req.body?.image
        if (!base64String||!typeImage){
            return res.status(200).json({
                errCode: 1,
                errMessage: 'missing image or image type'
            })
        }
        const base64Image = base64String.split(';base64,').pop()
        const imageBuffer = Buffer.from(base64Image, 'base64')
        const metadata = await sharp(imageBuffer).metadata();
        // console.log('d',metadata)
        if (typeImage === 'mobile') {
            if (metadata.width == configImage.mobile.width || metadata.height == configImage.mobile.height) {
                valid = true
            }
        } else if (typeImage === 'desktop') {
            if (metadata.width == configImage.desktop.width || metadata.height == configImage.desktop.height) {
                valid = true
            }
        }
        if (valid) {
            next()
        } else {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'invalid image size'
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
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

    validateImage,

    createUpdateDeleteImageBanner,
}