import express from "express";
import { api } from "../utils";
import bodyController from '../controllers/bodyController';
import { validateAuth } from "../auth/validateAuthen";

const router = express.Router()

let routeBody = (app) => {
     // body
     router.post('', validateAuth, bodyController.createUpdateDeleteBody)
     router.get(`/:id?`, bodyController.getBody)
     router.put('', validateAuth, bodyController.createUpdateDeleteBody)
     router.delete('', validateAuth, bodyController.createUpdateDeleteBody)

    return app.use(api.BODYS, router)
}

module.exports = routeBody;
