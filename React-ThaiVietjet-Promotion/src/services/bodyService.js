import { api } from "utils";
import { create, get, update, deleteData } from 'services/constantService'

// body

const createBody = (data) => {
    return create(api.BODYS, data)
}

const getBody = (id) => {
    return get(api.BODYS, id)
}

const updateBody = (data) => {
    return update(api.BODYS, data)
}

const deleteBody = (data) => {
    return deleteData(api.BODYS, data.id)
}

export {
    createBody,
    getBody,
    updateBody,
    deleteBody,
}