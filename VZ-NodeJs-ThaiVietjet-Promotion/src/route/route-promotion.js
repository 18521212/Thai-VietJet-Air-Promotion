import express from "express"
import { api } from "../utils"
import promotionController from '../controllers/promotionController'
import { validateAuth } from "../auth/validateAuthen"

const router = express.Router()

let routePromotion = (app) => {
   // promotion
   router.post(api.PROMOTIONS, validateAuth, promotionController.createUpdateDeletePromotion)
   router.get(`${api.PROMOTIONS}/:id?`, promotionController.getPromotion)
   router.put(api.PROMOTIONS, validateAuth, promotionController.createUpdateDeletePromotion)
   router.delete(api.PROMOTIONS, validateAuth, promotionController.createUpdateDeletePromotion)

   // pack
   router.post(api.PACKS, validateAuth, promotionController.createUpdateDeletePack)
   router.get(`${api.PACKS}/:id?`, promotionController.getPack)
   router.put(api.PACKS, validateAuth, promotionController.createUpdateDeletePack)
   router.delete(api.PACKS, validateAuth, promotionController.createUpdateDeletePack)

    return app.use('/', router)
}

module.exports = routePromotion;