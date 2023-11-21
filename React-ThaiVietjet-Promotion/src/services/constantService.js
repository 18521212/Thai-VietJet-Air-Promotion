import { toast } from "react-toastify";
import axios from "../axios";
import { api } from "utils";
import reduxStore from '../../src/redux';

const getRedux = (dispatch, getState) => {
    return reduxStore.getState()
}

const attachToken = (data) => {
    let reduxState = getRedux()
    let user = reduxState.admin.user
    data.accessToken = user?.signInUserSession?.accessToken?.jwtToken
}

const create = (link, data) => {
    attachToken(data)
    return axios.post(link, data)
}

const get = (link, id) => {
    if (id) {
        return axios.get(`${link}/${id}`)
    } else {
        return axios.get(`${link}`)
    }
}

const update = (link, data) => {
    attachToken(data)
    return axios.put(link, data)
}

// const deleteData = (link, id) => {
//     let data = {
//         ['id']: id
//     }
//     attachToken(data)
//     return axios.delete(link, {
//         data: data
//     })
// }

const deleteData = (link, data) => {
    let dataSend = {
        ['id']: data.id
    }
    attachToken(dataSend)
    return axios.delete(link, {
        data: dataSend
    })
}

export {
    create, get,
    update, deleteData
}