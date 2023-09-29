import { toast } from 'react-toastify'

export const func = {
    ALERT_RES: (res) => {
        if (res.errCode === 0) {
            toast.success(res.errMessage)
            return true
        } else {
            toast.error(res.errMessage)
            return false
        }
    }
}