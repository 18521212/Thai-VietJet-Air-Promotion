import { toast } from 'react-toastify'
import { CommonUtils } from "utils"
import _, { property } from 'lodash'
import { type } from 'utils'

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
    ONCHANGE_SELECT: (parent, selectedValue, actions) => {
        parent.setState({
            [actions.name]: selectedValue
        })
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
    ONCHANGE_EDITOR: () => {

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
        func.ALERT_RES(res) && callBackFunc(res)
    },
    HANDLE_CREATE_UPDATE_V2: (parent, objectDefault, serviceCreate, serviceUpdate) => {
        // usage
        // func.HANDLE_CREATE_UPDATE_V2(this,
        //     ['formId', { key: 'inputId', property: ['selectedInput', 'value', 'id'] }, ['key1','name'], 'order', 'widthMdScreen'],
        //     {
        //         func: createFormDetail,
        //         callBack: () => { func.NAV(this, -1) }
        //     },
        //     {
        //         func: updateFormDetail,
        //         property: ['id', 'order', 'widthMdScreen', 'inputId'],
        //         callBack: () => { func.NAV(this, -1) }
        //     })
        const handleItem = (item) => {
            if (typeof (item) === 'object') {
                if (item.property?.length > 0) {
                    data[item?.key] = func.OBJECT(parent.state, item.property)
                } else {
                    data[item?.key] = parent.state.property
                }
            } else if (Array.isArray(item)) {
                data[item.at(-1)] = func.OBJECT(parent.state, item)
            } else {
                data[item] = parent.state?.[item]
            }
        }
        let type = parent.props.params?.type
        let data = {}
        objectDefault.length > 0 && objectDefault.map(item => {
            handleItem(item)
        })
        switch (type) {
            case 'update':
                serviceUpdate?.property?.length > 0 && serviceUpdate.property.map(item => {
                    handleItem(item)
                })
                func.HANDLE_CREATE_UPDATE(data, serviceUpdate.func, serviceUpdate.callBack)
                break;
            default:
                func.HANDLE_CREATE_UPDATE(data, serviceCreate.func, serviceCreate.callBack)
                break;
        }
    },
    OBJECT: (object, property) => {
        // usage
        // func.OBJECT(parent.state, item)
        let res
        (property.length > 0) && property.map((item, index) => {
            if (!res) {
                res = object[item]
            } else {
                res = res[item]
            }
        })
        return res
    },
    OBJECT_V2: (object, property) => {
        let res
        let getProperty = (data, itemParam) => {
            let property
            if (Array.isArray(itemParam)) {
                itemParam.map(item => {
                    if (!_.isEmpty(data.item)) {
                        property = item
                        return
                    }
                })
            } else {
                property = itemParam
            }
            return property
        }
        (property.length > 0) && property.map((item, index) => {
            if (!res) {
                res = object[getProperty(object, item)]
            } else {
                res = res[getProperty(object, item)]
            }
        })
        return res
    },
    HANDLE_DELETE: (text, data, funcDelete, callBackFunc) => {
        func.ALERT_CONFIRM(text, async () => {
            let res = await funcDelete({ id: data.id })
            if (func.ALERT_RES(res)) return callBackFunc()
        })
    },
    HADLE_DELETE_CONDITION: (text, data, funcDelete, condition, callBackFunc) => {
        // Usage
        // HADLE_DELETE_CONDITION: (text, data, funcDelete, ['key', 'key'], callBackFunc)
        let object = {}
        condition.map(item => {
            object[item] = data[item]
        })
        func.ALERT_CONFIRM(text, async () => {
            let res = await funcDelete(object)
            func.ALERT_RES(res) && callBackFunc()
        })
    },
    MAP_STATE_ROUTE: (parent, dataCreate, dataUpdate) => {
        // Usage
        // func.MAP_STATE_ROUTE(this, 
        // {
        // object: 'form',
        // property: ['id', 'name', {key1: 'formId', key2: 'id'}] optional
        // },
        // {
        // object: 'formDetail',
        // property: ['formId']
        // }
        // )
        let type = parent.props.params?.type
        switch (type) {
            case 'update':
                if (_.isEmpty(dataUpdate)) break
                let objectUpdate = {}
                let propsUpdate = parent.props.location.state?.[dataUpdate.object]
                if (dataUpdate?.property?.length > 0) {
                    dataUpdate.property.map(item => {
                        if (Array.isArray(item)) {
                            objectUpdate[item.at(-1)] = func.OBJECT(propsUpdate, item)
                        }
                        else if (typeof (item) === 'object') {
                            objectUpdate[item.key1] = func.OBJECT(propsUpdate, item.key2)
                        } else {
                            objectUpdate[item] = propsUpdate[item]
                        }
                    })
                } else {
                    objectUpdate = propsUpdate
                }
                parent.setState({
                    ...parent.state,
                    ...objectUpdate
                })
                break;
            default:
                if (_.isEmpty(dataCreate)) break
                let objectCreate = {}
                let propsCreate = parent.props.location.state?.[dataCreate.object]
                if (dataCreate.property.length > 0) {
                    dataCreate.property.map(item => {
                        if (typeof (item) === 'object') {
                            objectCreate[item.key1] = propsCreate[item.key2]
                        } else {
                            objectCreate[item] = propsCreate[item]
                        }
                    })
                } else {
                    objectCreate = propsCreate
                }
                parent.setState({
                    ...parent.state,
                    ...objectCreate
                })
                break;
        }
    },
    STATENAME_INPUT: (item) => {
        let name
        let titleEn = item.input.text_input.titleDataText_Input.valueEn
        name = _.camelCase(titleEn + item.input.id)
        return name
    },
    STATENAME_DROPDOWN: (item) => {
        let title = item.input.dropdown.title;
        let name
        name = [_.camelCase('selected' + title), _.camelCase('option' + title)]
        return name
    }
}

export const component = {
    BUTTON_SUBMIT: (parent, onClick, className = '') => {
        // usage
        // component.BUTTON_SUBMIT(this, this.onCreate)
        let type = parent.props.params?.type, component, text, classButton
        if (type === 'update') {
            classButton = 'btn-warning'
            text = 'Save'
        } else {
            classButton = 'btn-success'
            text = 'Submit'
        }
        component = <>
            <button
                type='button'
                className={`btn ${classButton} ` + className}
                onClick={onClick}
            >{text}</button>
        </>
        return component
    },
    CR_UP_TEXT: (param) => {
        let text, typeParam = param.props?.params?.type
        text = typeParam === type.UPDATE ? 'Update' : 'Create'
        return text
    }
}

export const auth = {
    ACCESS_TOKEN: (param) => {
        let accessToken =
            param.signInUserSession.accessToken.jwtToken
            || param.props.user.signInUserSession.accessToken.jwtToken
        return accessToken
    }
}