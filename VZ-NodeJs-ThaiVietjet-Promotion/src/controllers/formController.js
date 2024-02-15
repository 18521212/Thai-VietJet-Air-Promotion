import formService from '../services/formService';
import { resolveObj, controller } from '../utils';

// form

let createUpdateDeleteForm = async (req, res, next) => {
    try {
        let method = req.method
        let data
        switch (method) {
            case 'POST':
                data = await formService.createForm(req.body);
                break;
            case 'PUT':
                data = await formService.updateForm(req.body);
                break;
            case 'DELETE':
                data = await formService.deleteForm(req.body.id);
                break;
            default:
                break;
        }
        res.data = data
        next()
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getForm = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, formService.getForm, req?.params?.id)
}

// form detail

let getAllFormDetail = async (req, res, next) => {
    try {
        let data = await formService.getAllFormDetail();
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getFormDetailByFormId = async (req, res, next) => {
    try {
        let data = await formService.getFormDetailByFormId(req.params.formId);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let addInputIntoForm = async (req, res, next) => {
    try {
        let data = await formService.addInputIntoForm(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateFormDetail = async (req, res, next) => {
    try {
        let data = await formService.updateFormDetail(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deleteFormDetail = async (req, res, next) => {
    try {
        let data = await formService.deleteFormDetail(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// input

let getInput = async (req, res, next) => {
    let id = req.params.id
    if (id) {
        controller.CONTROLLER(req, res, next, formService.getInputById, id)
    } else {
        controller.CONTROLLER(req, res, next, formService.getAllInput)
    }
}

let deleteInputById = async (req, res, next) => {
    try {
        let data = await formService.deleteInputById(req.body.id);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

// text input

let createTextInput = async (req, res, next) => {
    try {
        let data = await formService.createTextInput(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllTextInput = async (req, res, next) => {
    try {
        let data = await formService.getAllTextInput();
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let updateTextInput = async (req, res, next) => {
    controller.CONTROLLER(req, res, next, formService.updateTextInput, req.body)
}

// dropdown

let createUpdateDropdown = async (req, res, next) => {
    let method = req.method
    switch (method) {
        case 'POST':
            controller.CONTROLLER(req, res, next, formService.createDropdown, req.body)
            break;
        case 'PUT':
            controller.CONTROLLER(req, res, next, formService.updateDropdown, req.body)
            break;
        default:
            break;
    }
    // try {
    //     let data = await formService.createDropdown(req.body);
    //     return res.status(200).json(data)
    // } catch (e) {
    //     console.log(e)
    //     return res.status(200).json({
    //         errCode: -1,
    //         errMessage: 'Error from the server'
    //     })
    // }
}

let getDropdownById = async (req, res, next) => {
    try {
        let data = await formService.getDropdownById(req.params.id);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let createDeleteDataDropdown = async (req, res, next) => {
    let method = req.method
    switch (method) {
        case 'POST':
            controller.CONTROLLER(req, res, next, formService.addDataDropdown, req.body)
            break;
        case 'DELETE':
            controller.CONTROLLER(req, res, next, formService.deleteDataDropdown, req.body)
            break;
        default:
            break;
    }
}

let addDataDropdown = async (req, res, next) => {
    try {
        let data = await formService.addDataDropdown(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

// pack

let createPack = async (req, res, next) => {
    try {
        let data = await formService.createPack(req.body);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllPack = async (req, res, next) => {
    try {
        let data = await formService.getAllPack();
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let deletePackById = async (req, res, next) => {
    try {
        let data = await formService.deletePackById(req.params.id);
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let fetchData = async (req, res, next) => {
    try {
        let data = await formService.fetchData();
        res.data = data
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createUpdateDeleteForm,
    getForm,

    getAllFormDetail,
    getFormDetailByFormId,
    addInputIntoForm,
    updateFormDetail,
    deleteFormDetail,

    getInput,
    deleteInputById,

    createTextInput,
    getAllTextInput,
    updateTextInput,

    createUpdateDropdown,
    getDropdownById,

    addDataDropdown,
    createDeleteDataDropdown,

    createPack,
    getAllPack,
    deletePackById,

    fetchData,
}