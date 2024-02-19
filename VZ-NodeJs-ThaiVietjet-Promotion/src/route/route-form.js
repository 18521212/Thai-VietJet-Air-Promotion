import express from "express"
import { api } from "../utils"
import formController from '../controllers/formController'
import { validateAuth } from "../auth/validateAuthen"

const router = express.Router()

let routeForm = (app) => {
    // form
    router.post(api.FORMS,
        // validateAuth, 
        formController.createUpdateDeleteForm)
    router.get(`${api.FORMS}/:id?`, formController.getForm)
    router.put(api.FORMS,
        // validateAuth, 
        formController.createUpdateDeleteForm)
    router.delete(api.FORMS,
        // validateAuth,
        formController.createUpdateDeleteForm)

    // form detail
    router.get('/api/form-details', formController.getAllFormDetail)
    router.get('/api/form-details/forms/:formId', formController.getFormDetailByFormId)
    router.post('/api/form-details', validateAuth, formController.addInputIntoForm)
    router.put('/api/form-details', validateAuth, formController.updateFormDetail)
    router.delete('/api/form-details', validateAuth, formController.deleteFormDetail)

    // input
    router.get(`${api.INPUTS}/:id?`, formController.getInput)
    router.delete(api.INPUTS, validateAuth, formController.deleteInputById)

    // text input
    router.post(api.TEXT_INPUTS, validateAuth, formController.createTextInput)
    router.get(api.TEXT_INPUTS, formController.getAllTextInput)
    router.put(api.TEXT_INPUTS, validateAuth, formController.updateTextInput)

    // dropdown
    router.post(api.DROPDOWNS, validateAuth, formController.createUpdateDropdown)
    router.get(`${api.DROPDOWNS}/:id`, formController.getDropdownById)
    router.put(api.DROPDOWNS, validateAuth, formController.createUpdateDropdown)

    // data dropdown
    router.post(api.DATA_DROPDOWNS, validateAuth, formController.createDeleteDataDropdown)
    router.delete(api.DATA_DROPDOWNS, validateAuth, formController.createDeleteDataDropdown)

    return app.use('/', router)
}

module.exports = routeForm;