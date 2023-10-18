import { toast } from "react-toastify";
import axios from "../axios";
import { api } from "utils";
import { create, get, update, deleteData } from 'services/constantService'

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