import express from "express"
import { api } from "../utils"
import footerController from '../controllers/footerController'
import { validateAuth } from "../auth/validateAuthen"

const router = express.Router()

let routeFooter = (app) => {
    // footer
    router.post(api.FOOTERS, validateAuth, footerController.createFooter)
    router.get(`${api.FOOTERS}/:id?`, footerController.getFooter)
    router.put(api.FOOTERS, validateAuth, footerController.updateFooter)
    router.delete(api.FOOTERS, validateAuth, footerController.deleteFooter)

    // footer text
    router.post('/api/footer-texts', validateAuth, footerController.createFooterText)
    router.get('/api/footer-texts/footers/:id', footerController.getAllFooterText)
    router.put('/api/footer-texts', validateAuth, footerController.updateFooterText)
    router.delete('/api/footer-texts', validateAuth, footerController.deleteFooterText)

    return app.use('/', router)
}

module.exports = routeFooter;