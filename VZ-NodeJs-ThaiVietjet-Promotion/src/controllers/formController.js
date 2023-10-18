import formService from '../services/formService';
import { resolveObj, controller } from '../utils';

// form

let createUpdateDeleteForm = async (req, res) => {
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
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let getForm = async (req, res) => {
    try {
        let data
        if (req.params.id) {
            data = await formService.getFormById(req.params.id)
        } else {
            data = await formService.getAllForm()
        }
        return res.status(200).json(data)
    } catch (e) {
        console.log(e);
        return res.status(200).json(resolveObj.ERROR_SERVER)
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

let getFormDetailByFormId = async (req, res) => {
    try {
        let data = await formService.getFormDetailByFormId(req.params.formId);
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

let getInput = async (req, res) => {
    let id = req.params.id
    if (id) {
        controller.CONTROLLER(req, res, formService.getInputById, id)
    } else {
        controller.CONTROLLER(req, res, formService.getAllInput)
    }
}

let deleteInputById = async (req, res) => {
    try {
        let data = await formService.deleteInputById(req.body.id);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

// text input

let createTextInput = async (req, res) => {
    try {
        let data = await formService.createTextInput(req.body);
        return res.status(200).json(data)
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

let updateTextInput = async (req, res) => {
    controller.CONTROLLER(req, res, formService.updateTextInput, req.body)
}

// dropdown

let createUpdateDropdown = async (req, res) => {
    let method = req.method
    switch (method) {
        case 'POST':
            controller.CONTROLLER(req, res, formService.createDropdown, req.body)
            break;
        case 'PUT':
            controller.CONTROLLER(req, res, formService.updateDropdown, req.body)
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

let createDeleteDataDropdown = async (req, res) => {
    let method = req.method
    switch (method) {
        case 'POST':
            controller.CONTROLLER(req, res, formService.addDataDropdown, req.body)
            break;
        case 'DELETE':
            controller.CONTROLLER(req, res, formService.deleteDataDropdown, req.body)
            break;
        default:
            break;
    }
}

let addDataDropdown = async (req, res) => {
    try {
        let data = await formService.addDataDropdown(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.ERROR_SERVER)
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
    createUpdateDeleteForm,
    getForm: getForm,

    getAllFormDetail: getAllFormDetail,
    getFormDetailByFormId,
    addInputIntoForm: addInputIntoForm,
    updateFormDetail: updateFormDetail,
    deleteFormDetail: deleteFormDetail,

    getInput,
    deleteInputById: deleteInputById,

    createTextInput: createTextInput,
    getAllTextInput: getAllTextInput,
    updateTextInput,

    createUpdateDropdown,
    getDropdownById: getDropdownById,

    addDataDropdown,
    createDeleteDataDropdown,

    createPack: createPack,
    getAllPack: getAllPack,
    deletePackById: deletePackById,

    fetchData: fetchData,
}