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

let getFooter = async (req, res) => {
    try {
        let data
        if (req.params.id) {
            data = await footerService.getFooterById(req.params.id);
        } else {
            data = await footerService.getAllFooter();
        }
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
        let data = await footerService.getAllFooterText(req.params.id);
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

let deleteFooterText = async (req, res) => {
    try {
        let data = await footerService.deleteFooterText(req.body.id);
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
    getFooter: getFooter,
    updateFooter: updateFooter,
    deleteFooter: deleteFooter,

    createFooterText: createFooterText,
    getAllFooterText: getAllFooterText,
    updateFooterText: updateFooterText,
    deleteFooterText,
}