import promotionService from '../services/promotionService'
import { resolveObj, controller } from '../utils';

// promotion
let createUpdateDeletePromotion = async (req, res, next) => {
    controller.SWITCH_CONTROLLER(req, res, next, {
        create: promotionService.createPromotion,
        update: promotionService.updatePromotion,
        delete: promotionService.deletePromotion,
    })
}

let getPromotion = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, promotionService.getPromotion, req?.params?.id)
}

// pack
let createUpdateDeletePack = async (req, res, next) => {
    controller.SWITCH_CONTROLLER(req, res, next, {
        create: promotionService.createPack,
        update: promotionService.updatePack,
        delete: promotionService.deletePack
    })
}

let getPack = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, promotionService.getPack, req?.params?.id)
}

module.exports = {
    createUpdateDeletePromotion,
    getPromotion,

    createUpdateDeletePack,
    getPack,
}