import bodyService from '../services/bodyService';
import { resolveObj, func } from '../utils';

let getContentBody = async (req, res) => {
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
    getContentBody: getContentBody,
}