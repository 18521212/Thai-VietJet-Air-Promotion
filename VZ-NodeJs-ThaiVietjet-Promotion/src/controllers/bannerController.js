import bannerService from '../services/bannerService';

let createBanner = async (req, res) => {
    try {
        let data = await bannerService.createBanner(req.body);
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

let getAllBanner = async (req, res) => {
    try {
        let data = await bannerService.getAllBanner();
        return res.status(200).json(
            data
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createBanner: createBanner,
    getAllBanner: getAllBanner,
}