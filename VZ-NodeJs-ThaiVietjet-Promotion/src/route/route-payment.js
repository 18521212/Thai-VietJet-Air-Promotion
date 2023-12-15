import express from "express"
import { api } from "../utils"
import paymentController from '../controllers/paymentController'
import { validateCustomerInput, validatePack } from "../middleware/paymentValidate"

const router = express.Router()

let routePayment = (app) => {
    router.post('',
        validateCustomerInput,
        validatePack,
        paymentController.paymentPromotion
    )
    router.put('/orders',
        paymentController.updateStatusOrder
    )
    // router.post('/datafeed', validateCustomerInput)

    return app.use(api.PAYMENTS, router)
}

module.exports = routePayment;