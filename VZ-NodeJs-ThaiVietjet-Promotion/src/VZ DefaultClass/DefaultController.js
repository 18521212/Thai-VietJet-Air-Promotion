import defaultService from '../services/defaultService';

let defaultFunction = async (req, res) => {
    try {
        let data = await defaultService.defaultFunction(req.body);
        return res.status(200).json({
            data
        })
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    defaultFunction: defaultFunction,
}