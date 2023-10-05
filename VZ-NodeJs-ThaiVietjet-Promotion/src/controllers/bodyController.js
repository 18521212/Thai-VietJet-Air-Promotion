import bodyService from '../services/bodyService';
import { resolveObj, func } from '../utils';

let createUpdateDeleteBody = async (req, res) => {
    try {
        let method = req.method, data
        if (method === 'POST') {
            data = await bodyService.createBody(req.body)
        } else if (method === 'PUT') {
            data = await bodyService.updateBody(req.body)
        } else if (method === 'DELETE') {
            data = await bodyService.deleteBody(req.body.id)
        }
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getBody = async (req, res) => {
    try {
        let data
        if (req.params.id) {
            data = await bodyService.getContentBodyById(req.params.id)
        } else {
            data = await bodyService.getAllContentBody()
        }
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

module.exports = {
    createUpdateDeleteBody,
    getBody,
}