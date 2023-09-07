import formService from '../services/formService';

// form section

let createFormSection = async (req, res) => {
    try {
        let data = await formService.createFormSection(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllFormSection = async (req, res) => {
    try {
        let data = await formService.getAllFormSection();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getFormSectionById = async (req, res) => {
    try {
        let data = await formService.getFormSectionById(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// form

let createForm = async (req, res) => {
    try {
        let data = await formService.createForm(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllForm = async (req, res) => {
    try {
        let data = await formService.getAllForm();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// form detail

let getAllFormDetail = async (req, res) => {
    try {
        let data = await formService.getAllFormDetail();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let addInputIntoForm = async (req, res) => {
    try {
        let data = await formService.addInputIntoForm(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateFormDetail = async (req, res) => {
    try {
        let data = await formService.updateFormDetail(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteFormDetail = async (req, res) => {
    try {
        let data = await formService.deleteFormDetail(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// input

let getAllInput = async (req, res) => {
    try {
        let data = await formService.getAllInput();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteInputById = async (req, res) => {
    try {
        let data = await formService.deleteInputById(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// text input

let createTextInput = async (req, res) => {
    try {
        let data = await formService.createTextInput(req.body);
        return res.status(200).json({
            data
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllTextInput = async (req, res) => {
    try {
        let data = await formService.getAllTextInput();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// dropdown

let createDropdown = async (req, res) => {
    try {
        let data = await formService.createDropdown(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDropdownById = async (req, res) => {
    try {
        let data = await formService.getDropdownById(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createRowDataDropdown = async (req, res) => {
    try {
        let data = await formService.createRowDataDropdown(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// pack

let createPack = async (req, res) => {
    try {
        let data = await formService.createPack(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllPack = async (req, res) => {
    try {
        let data = await formService.getAllPack();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deletePackById = async (req, res) => {
    try {
        let data = await formService.deletePackById(req.params.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let fetchData = async (req, res) => {
    try {
        let data = await formService.fetchData();
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createFormSection: createFormSection,
    getAllFormSection: getAllFormSection,
    getFormSectionById: getFormSectionById,

    createForm: createForm,
    getAllForm: getAllForm,

    getAllFormDetail: getAllFormDetail,
    addInputIntoForm: addInputIntoForm,
    updateFormDetail: updateFormDetail,
    deleteFormDetail: deleteFormDetail,

    getAllInput: getAllInput,
    deleteInputById: deleteInputById,

    createTextInput: createTextInput,
    getAllTextInput: getAllTextInput,

    createDropdown: createDropdown,
    getDropdownById: getDropdownById,
    createRowDataDropdown: createRowDataDropdown,

    createPack: createPack,
    getAllPack: getAllPack,
    deletePackById: deletePackById,

    fetchData: fetchData,
}