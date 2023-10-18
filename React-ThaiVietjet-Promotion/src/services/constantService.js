import { toast } from "react-toastify";
import axios from "../axios";
import { api } from "utils";

const create = (link, data) => {
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
    return axios.put(link, data)
}

const deleteData = (link, id) => {
    return axios.delete(link, {
        data: {
            ['id']: id
        }
    })
}

export {
    create, get,
    update, deleteData
}