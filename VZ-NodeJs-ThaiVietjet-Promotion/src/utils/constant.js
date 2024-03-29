export const api = {
    CAMPAIGNS: '/api/campaigns',
    HEADERS: '/api/headers',
    MENUS: '/api/menus',
    BANNERS: '/api/banners',
    BODYS: '/api/bodies',
    FORMS: '/api/forms',
    INPUTS: '/api/inputs',
    TEXT_INPUTS: '/api/text-inputs',
    DROPDOWNS: '/api/dropdowns',
    DATA_DROPDOWNS: '/api/data-dropdowns',
    PROMOTIONS: '/api/promotions',
    PACKS: '/api/packs',
    FOOTERS: '/api/footers',
    MARKDOWNS: '/api/markdowns',
    FAQS: '/api/faqs',
    FAQ_QUESTIONS: '/api/faq-questions',
    PAYMENTS: '/api/payments'
}

export const route = {
    IMAGE_BANNERS: '/image_banners'
}

export const text = {
    OK: 'Ok',
    MISSING_PARAMETERS: 'Missing required parameters',
    CREATE_SUCCEED: (data_table = 'data') => {
        return `Create new ${data_table} succeed`
    },
    UPDATE_SUCCEED: (data_table = 'table') => {
        return `Update data in ${data_table} succeed`
    },
    DELETE_SUCCEED: (data_table = 'table') => {
        return `Delete data in ${data_table} succeed`
    },

    NOT_FOUND: (data_table = '') => {
        return `Data in table ${data_table} not found`
    },
    EXIST_REF_KEY: 'Alter data unsucceed, exist reference key from other table',

    CREATE_UNSUCCEED: (data_table = 'data') => {
        return `Create new ${data_table} unsucceed`
    },
    UPDATE_UNSUCCEED: (data_table = 'table') => {
        return `Update data in ${data_table} unsucceed`
    },
    DELETE_UNSUCCEED: (data_table = 'table') => {
        return `Delete data in ${data_table} unsucceed or data does not exist`
    },
};

export const resolveObj = {
    MISSING_PARAMETERS: {
        errCode: 1,
        errMessage: text.MISSING_PARAMETERS
    },
    CREATE_SUCCEED: (data_table, data) => {
        return {
            errCode: 0,
            errMessage: text.CREATE_SUCCEED(data_table),
            data: data
        }
    },
    GET: (_data) => {
        return {
            errCode: 0,
            errMessage: text.OK,
            data: _data
        }
    },
    UPDATE_SUCCEED: (data_table) => {
        return {
            errCode: 0,
            errMessage: text.UPDATE_SUCCEED(data_table)
        }
    },
    DELETE_SUCCEED: (data_table) => {
        return {
            errCode: 0,
            errMessage: text.DELETE_SUCCEED(data_table)
        }
    },

    NOT_FOUND: (data_table) => {
        return {
            errCode: 404,
            errMessage: text.NOT_FOUND(data_table)
        }
    },
    EXIST_REF_KEY: {
        errCode: 1,
        errMessage: text.EXIST_REF_KEY
    },
    ERROR_SERVER: {
        errCode: -1,
        errMessage: 'Error from the server'
    },
    UNAUTHEN_ERROR: {
        errCode: 1,
        errMessage: 'Authentication Error'
    },
    ERROR: (errCode, errMessage) => {
        return {
            errCode: errCode,
            errMessage: errMessage
        }
    },
    CREATE_UNSUCCEED: (data_table) => {
        return {
            errCode: 1,
            errMessage: text.CREATE_UNSUCCEED(data_table)
        }
    },
    UPDATE_UNSUCCEED: (table) => {
        return {
            errCode: 1,
            errMessage: text.UPDATE_UNSUCCEED(table)
        }
    },
    DELETE_UNSUCCEED: (data_table) => {
        return {
            errCode: 1,
            errMessage: text.DELETE_UNSUCCEED(data_table)
        }
    },
}

export const services = {
    SERVICE: (func) => {
        return new Promise(async (resolve, reject) => {
            try {

            } catch (e) {
                reject(e);
            }
        })
    }
}

export const controller = {
    // usage
    // controller.SWITCH_CONTROLLER(req, res, next, {
    //     create: promotionService.createPromotion,
    //     update: promotionService.updatePromotion,
    //     delete: promotionService.deletePromotion,
    // })
    SWITCH_CONTROLLER: (req, res, next, func) => {
        let method = req.method
        switch (method) {
            case 'POST':
                func?.create && controller.CONTROLLER(req, res, next, func.create, req.body)
                break;
            case 'PUT':
                func?.update && controller.CONTROLLER(req, res, next, func.update, req.body)
                break;
            case 'DELETE':
                func?.delete && controller.CONTROLLER(req, res, next, func.delete, req.body)
                break;
            default:
                break;
        }
    },
    CONTROLLER: async (req, res, next, func, dataFunc = undefined) => {
        try {
            let data
            if (dataFunc) {
                data = await func(dataFunc)
            } else {
                data = await func()
            }
            res.data = data
            return res.status(200).json(res.data)
        } catch (e) {
            console.log(e)
            return res.status(200).json(resolveObj.ERROR_SERVER)
        }
    }
}

export const func = {
    CHECK_HAS_VALUE: (...args) => {
        let result = true
        args.map((item) => {
            if (!item) {
                result = false
                return
            }
        })
        return result
    },
    CHECK_HAS_VALUE_OR: (...args) => {
        let result = false
        args.map((item) => {
            if (item) {
                result = true
                return
            }
        })
        return result
    },
    ORDER: (array, property, type) => {
        if (type === 'asc') {
            array = array.sort((a, b) => a?.[property] - b?.[property]);
        } else if (type === 'desc') {
            array = array.sort((a, b) => b?.[property] - a?.[property]);
        }
    },
    DECODE_IMAGE: (encodeImage) => {
        let decode = new Buffer(encodeImage, 'base64').toString('binary')
        return decode
    }
}

export const type = {
    TEXT: 'text',
    DROPDOWN: 'dropdown',
}