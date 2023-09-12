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

    NOT_FOUND: (data_table) => {
        return `Data in table ${data_table} not found`
    },
    EXIST_REF_KEY: 'Exist reference key to this table from other table, please remove reference key on that tables first',

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
        errCode: 0,
        errMessage: text.MISSING_PARAMETERS
    },
    CREATE_SUCCEED: (data_table) => {
        return {
            errCode: 0,
            errMessage: text.CREATE_SUCCEED(data_table)
        }
    },
    GET: (data) => {
        return {
            errCode: 0,
            errMessage: text.OK,
            data
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