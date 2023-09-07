import bodyService from '../services/bodyService';

let getContentBodyById = async (req, res) => {
    try {
        let data = await bodyService.getContentBodyById(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getContentBodyById: getContentBodyById,
}