import { api } from "utils";
import { postAPI, putAPI } from 'services/constantService'

const sentPayment = (data) => {
    return postAPI(api.PAYMENTS, data)
}

const updateOrderStatus = (data)=>{
    return putAPI(`${api.PAYMENTS}/orders`, {orderRef: data.orderRef})
}

export {
    sentPayment,
    updateOrderStatus
}
