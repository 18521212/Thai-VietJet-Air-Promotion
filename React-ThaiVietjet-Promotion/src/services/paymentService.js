import { api } from "utils";
import { postAPI, putAPI, get } from 'services/constantService'

const sentPayment = (data) => {
    return postAPI(api.PAYMENTS, data)
}

const updateOrderStatus = (data) => {
    return putAPI(`${api.PAYMENTS}/orders`, { orderRef: data.orderRef })
}

const updateProcessingOrder = (data) => {
    return putAPI(`${api.PAYMENTS}/orders/status/processing`, data)
}

const getOrder = (ref) => {
    return get(`${api.PAYMENTS}/orders`, ref)
}

export {
    sentPayment,
    updateOrderStatus,
    updateProcessingOrder,
    getOrder,
}
