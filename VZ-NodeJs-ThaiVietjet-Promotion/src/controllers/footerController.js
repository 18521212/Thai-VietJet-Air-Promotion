import footerService from '../services/footerService';

// footer

let createFooter = async (req, res) => {
    try {
        let data = await footerService.createFooter(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllFooter = async (req, res) => {
    try {
        let data = await footerService.getAllFooter();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getFooterById = async (req, res) => {
    try {
        let data = await footerService.getFooterById(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateFooter = async (req, res) => {
    try {
        let data = await footerService.updateFooter(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteFooter = async (req, res) => {
    try {
        let data = await footerService.deleteFooter(req.body.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// footer text

let createFooterText = async (req, res) => {
    try {
        let data = await footerService.createFooterText(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllFooterText = async (req, res) => {
    try {
        let data = await footerService.getAllFooterText();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateFooterText = async (req, res) => {
    try {
        let data = await footerService.updateFooterText(req.body);
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
    createFooter: createFooter,
    getAllFooter: getAllFooter,
    updateFooter: updateFooter,
    deleteFooter: deleteFooter,

    createFooterText: createFooterText,
    getAllFooterText: getAllFooterText,
    getFooterById: getFooterById,
    updateFooterText: updateFooterText
}