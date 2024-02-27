import express from "express"
import { api } from "../utils"
import footerController from '../controllers/footerController'
import { validateAuth } from "../auth/validateAuthen"

const router = express.Router()

let routeFooter = (app) => {
    // footer
    router.post(api.FOOTERS,
        // validateAuth,
        footerController.createFooter)
    router.get(`${api.FOOTERS}/:id?`, footerController.getFooter)
    router.put(api.FOOTERS,
        // validateAuth,
        footerController.updateFooter)
    router.delete(api.FOOTERS,
        // validateAuth,
        footerController.deleteFooter)

    // footer text
    router.post('/api/footer-texts', validateAuth, footerController.createFooterText)
    router.get('/api/footer-texts/footers/:id', footerController.getAllFooterText)
    router.put('/api/footer-texts', validateAuth, footerController.updateFooterText)
    router.delete('/api/footer-texts', validateAuth, footerController.deleteFooterText)


    // markdown
    router.post(api.MARKDOWNS, validateAuth, footerController.createUpdateDeleteMarkdown)
    router.get(`${api.MARKDOWNS}/:id?`, footerController.getMarkdown)
    router.put(api.MARKDOWNS, validateAuth, footerController.createUpdateDeleteMarkdown)
    router.delete(api.MARKDOWNS, validateAuth, footerController.createUpdateDeleteMarkdown)

    // FAQ

    router.post(api.FAQS, validateAuth, footerController.createUpdateDeleteFAQ)
    router.get(`${api.FAQS}/:id?`, footerController.getFAQ)
    router.put(api.FAQS, validateAuth, footerController.createUpdateDeleteFAQ)
    router.delete(api.FAQS, validateAuth, footerController.createUpdateDeleteFAQ)

    // FAQ question

    router.post(api.FAQ_QUESTIONS, validateAuth, footerController.createUpdateDeleteFAQQuestion)
    router.get(`${api.FAQ_QUESTIONS}/:id?`, footerController.getFAQQuestion)
    router.put(api.FAQ_QUESTIONS, validateAuth, footerController.createUpdateDeleteFAQQuestion)
    router.delete(api.FAQ_QUESTIONS, validateAuth, footerController.createUpdateDeleteFAQQuestion)

    return app.use('/', router)
}

module.exports = routeFooter;