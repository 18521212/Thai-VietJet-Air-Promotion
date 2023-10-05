import { toast } from 'react-toastify'
import { CommonUtils } from "utils";

export const func = {
    ALERT_RES: (res) => {
        if (res.errCode === 0) {
            toast.success(res.errMessage)
            return true
        } else {
            toast.error(res.errMessage)
            return false
        }
    },
    ALERT_CONFIRM: (text, func) => {
        if (window.confirm(text) === true) {
            func && func()
            return true
        } else {
            return false
        }
    },
    NAV: (parent, link, data) => {
        parent?.props?.navigate(link, { state: data })
    },
    ONCHANGE_TEXT: (parent, name, e) => {
        parent.setState({ [name]: e.target.value })
    },
    ONCHANGE_IMAGE: async (parent, name, e, nameImagePreview) => {
        let data = e.target.files;
        let file = data[0];
        e.target.nextElementSibling.innerText = file.name // show file name
        let objectUrl
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            objectUrl = URL.createObjectURL(file);
            parent.setState({
                [nameImagePreview]: objectUrl,
                [name]: base64
            })
        }
    },
    MAP_STATE_UPDATE: (parent, data) => {
        if (data) {
            let stateCopy = { ...parent.state, ...data }
            parent.setState({
                ...stateCopy
            })
        }
    },
    HANDLE_CREATE_UPDATE: async (data, funcCreateUpdate, callBackFunc) => {
        let res = await funcCreateUpdate(data)
        func.ALERT_RES(res) && callBackFunc()
    },
    HANDLE_DELETE: (text, data, funcDelete, funcFetchData) => {
        func.ALERT_CONFIRM(text, async () => {
            let res = await funcDelete({ id: data.id })
            func.ALERT_RES(res) && funcFetchData()
        })
    }
}