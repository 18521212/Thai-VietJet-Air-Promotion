import { toast } from "react-toastify";
import axios from "../axios";
import { api } from "utils";
import { create, get, update, deleteData } from 'services/constantService'

// form

const createForm = (data) => {
    return create(api.FORMS, data)
}

const getForm = (id) => {
    return get(api.FORMS, id)
}

const getAllTextInput = () => {
    return get('/api/get-all-text-input')
    // return axios.get('/api/get-all-text-input')
}

const updateForm = (data) => {
    return update(api.FORMS, data)
}

const deleteForm = (data) => {
    return deleteData(api.FORMS, data.id)
}

// form detail

const createFormDetail = (data) => {
    return create(api.FORM_DETAILS, data)
}

const getFormDetailByFormId = (formId) => {
    return get(`${api.FORM_DETAILS}/forms/${formId}`)
}

const updateFormDetail = (data) => {
    return update(api.FORM_DETAILS, data)
}

const deleteFormDetail = (data) => {
    return deleteData(api.FORM_DETAILS, data.id)
}
// input
const getInput = (id) => {
    return get(api.INPUTS, id)
}

const deleteInput = (data) => {
    return deleteData(api.INPUTS, data.id)
}

// text input
const createTextInput = (data) => {
    return create(api.TEXT_INPUTS, data)
}

const updateTextInput = (data) => {
    return update(api.TEXT_INPUTS, data)
}

// dropdown

const createDropdown = (data) => {
    return create(api.DROPDOWNS, data)
}

const updateDropdown = (data) => {
    return update(api.DROPDOWNS, data)
}

// data dropdown
const createDataDropdown = (data) => {
    return create(api.DATA_DROPDOWNS, data)
}

const deleteDataDropdown = (data) => {
    console.log('del')
    return deleteData(api.DATA_DROPDOWNS, data.id)
}

export {
    // form
    createForm,
    getForm,
    getAllTextInput,
    updateForm,
    deleteForm,

    // form detail
    createFormDetail,
    getFormDetailByFormId,
    updateFormDetail,
    deleteFormDetail,

    // input
    getInput,
    deleteInput,

    // text input
    createTextInput,
    updateTextInput,

    // dropdown
    createDropdown,
    updateDropdown,

    // data dropdown
    createDataDropdown,
    deleteDataDropdown,
}