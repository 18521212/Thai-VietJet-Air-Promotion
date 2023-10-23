import promotionService from '../services/promotionService'
import { resolveObj, controller } from '../utils';

// promotion
let createUpdateDeletePromotion = async (req, res) => {
    controller.SWITCH_CONTROLLER(req, res, {
        create: promotionService.createPromotion,
        update: promotionService.updatePromotion,
        delete: promotionService.deletePromotion,
    })
}

let getPromotion = async (req, res) => {
    controller.CONTROLLER(req, res, promotionService.getPromotion, req?.params?.id)
}

// pack
let createUpdateDeletePack = async (req, res) => {
    controller.SWITCH_CONTROLLER(req, res, {
        create: promotionService.createPack,
        update: promotionService.updatePack,
        delete: promotionService.deletePack
    })
}

let getPack = async (req, res) => {
    controller.CONTROLLER(req, res, promotionService.getPack, req?.params?.id)
}

module.exports = {
    createUpdateDeletePromotion,
    getPromotion,

    createUpdateDeletePack,
    getPack,
}