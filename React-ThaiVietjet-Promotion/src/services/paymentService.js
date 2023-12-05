import { api } from "utils";
import { postAPI } from 'services/constantService'

const sentPayment = (data) => {
    return postAPI(api.PAYMENTS, data)
}

export {
    sentPayment,
}
