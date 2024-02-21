const db = require('../models');
const { resolveObj, func, type } = require('../utils');

// form

let createForm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response = ''
            if (!data.name) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let createData = await db.Form
                    .cache()
                    .create({
                        name: data.name,
                    })
                if (createData) {
                    _response = resolveObj.CREATE_SUCCEED()
                } else {
                    _response = resolveObj.CREATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let getForm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                include: [
                    { model: db.Form_Detail, as: 'form_detail' }
                ]
            }
            let _b = false
            try {
                let _rsl = await db.sequelize.transaction(async (t) => {
                    throw new Error()
                    return true
                })
                _b = _rsl
                console.log('t succ', _rsl)
            } catch (e) {
                console.log('t err', _b)
            }
            console.log('t o', _b)
            let _data
            let _response
            if (id) {
                _data = await db.Form
                    .cache(id)
                    .findOne({
                        where: { id: id },
                        ...query
                    })
            } else {
                _data = await db.Form
                    // .cache('all')
                    .findAll(query)
            }
            _response = resolveObj.GET(_data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateForm = data => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response = ''
            if (!func.CHECK_HAS_VALUE(data.id, data.name)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let form = await db.Form.findOne({ where: { id: data.id } })
                let dataUpdate
                if (form) {
                    dataUpdate = await form
                        .cache()
                        .update({ name: data.name })
                }
                if (dataUpdate) {
                    _response = resolveObj.UPDATE_SUCCEED()
                } else {
                    _response = resolveObj.UPDATE_UNSUCCEED()
                }
            }
            return resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteForm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response = ''
            if (!id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _form = await db.Form.findByPk(id)
                if (_form) {
                    let _transaction_status = false
                    try {
                        await db.sequelize.transaction(async (t) => {
                            let _del_fd = await db.Form_Detail
                                .destroy({ where: { formId: id }, transaction: t })
                            let _del_f = await _form
                                .cache()
                                .destroy({ transaction: t });
                        })
                        // if the execution reaches this line, the transaction has been committed
                        _transaction_status = true
                    } catch (e) {
                        _transaction_status = false
                    }
                    if (_transaction_status) {
                        _response = resolveObj.DELETE_SUCCEED()
                    } else {
                        _response = resolveObj.DELETE_UNSUCCEED()
                    }
                } else {
                    _response = resolveObj.NOT_FOUND()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

// form detail

let getAllFormDetail = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Form_Detail
                .cache('all')
                .findAll()
            let _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let getFormDetailByFormId = (formId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!formId) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let data = await db.Form_Detail
                    .cache(`all/${db.Form.name}/${formId}`)
                    .findAll({
                        where: { formId: formId },
                        order: [['order', 'asc']],
                        include: [
                            {
                                model: db.Input, as: 'input',
                                include: [
                                    {
                                        model: db.Text_Input, as: 'text_input',
                                        include: [
                                            { model: db.Text_Translation, as: 'titleDataText_Input' },
                                            { model: db.Text_Translation, as: 'placeHolderDataText_Input' }
                                        ]
                                    },
                                    {
                                        model: db.Dropdown, as: 'dropdown',
                                        include: [
                                            { model: db.Text_Translation, as: 'titleDataDropdown' },
                                            { model: db.Row_Dataset_Dropdown, as: 'dataDropdown' },
                                        ]
                                    },
                                ]
                            }
                        ]
                    })
                _response = resolveObj.GET(data)
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let addInputIntoForm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.formId || !data.inputId || !data.nameApi) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let form = await db.Form.findOne({
                    where: {
                        id: data.formId
                    }
                })
                let input = await db.Input.findOne({
                    where: {
                        id: data.inputId
                    },
                })
                if (!form || !input) {
                    if (!form) {
                        _response = resolveObj.NOT_FOUND('Form')
                    } else if (!input) {
                        _response = resolveObj.NOT_FOUND('Input')
                    }
                } else {
                    let _form_detail_create = await db.Form_Detail
                        .create({
                            formId: data.formId,
                            inputId: data.inputId,
                            order: data.order ? data.order : undefined,
                            widthMdScreen: data.widthMdScreen ? data.widthMdScreen : undefined,
                            required: data.required,
                            nameApi: data.nameApi
                        })
                    if (_form_detail_create) {
                        _response = resolveObj.CREATE_SUCCEED()
                    } else {
                        _response = resolveObj.CREATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let updateFormDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id || (!data.order && !data.widthMdScreen && !data.inputId && !data.nameApi)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let formDetail = await db.Form_Detail.findOne({
                    where: { id: data.id },
                })
                if (!formDetail) {
                    _response = resolveObj.NOT_FOUND('Form Detail')
                } else {
                    let _validInput = true
                    if (data.inputId) {
                        let input = await db.findOne({ where: { id: data.inputId } })
                        if (!input) {
                            _validInput = false
                            _response = resolveObj.NOT_FOUND('Input')
                        }
                    }
                    if (_validInput) {
                        let _form_detail_update = await formDetail.update({
                            inputId: data.inputId,
                            order: data.order && data.order,
                            widthMdScreen: data.widthMdScreen && data.widthMdScreen,
                            required: data.required,
                            nameApi: data.nameApi
                        })
                        if (_form_detail_update) {
                            _response = resolveObj.UPDATE_SUCCEED()
                        } else {
                            _response = resolveObj.UPDATE_UNSUCCEED()
                        }
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteFormDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _delete_form_detail = await db.Form_Detail.destroy({
                    where: {
                        id: data.id
                    }
                })
                if (_delete_form_detail >= 1) {
                    _response = resolveObj.DELETE_SUCCEED()
                } else {
                    _response = resolveObj.DELETE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

// input

let _queryInput = {
    include: [
        {
            model: db.Text_Input, as: 'text_input',
            include: [
                { model: db.Text_Translation, as: 'titleDataText_Input' },
                { model: db.Text_Translation, as: 'placeHolderDataText_Input' }
            ]
        },
        {
            model: db.Dropdown, as: 'dropdown',
            include: [
                { model: db.Text_Translation, as: 'titleDataDropdown' },
                { model: db.Row_Dataset_Dropdown, as: 'dataDropdown' },
            ]
        },
    ]
}

let getInput = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data;
            let _response
            if (id) {
                if (id.length > 0) {
                    data = await db.Input
                        .cache('all/<Id><Array>')
                        .findAll({ where: { id: id }, ..._queryInput })
                } else {
                    data = await db.Input
                        .cache(id)
                        .findOne({ where: { id: id }, ..._queryInput })
                }
            } else {
                data = await db.Input
                    .cache('all')
                    .findAll(_queryInput)
            }
            _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteInputById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        // !formDetail -> input -> text_translation /d -> || /d row_data_dropdown /d -> input /d
        try {
            let _response
            if (!inputId) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let formDetail = await db.Form_Detail.findOne({
                    where: {
                        inputId: inputId
                    }
                })
                if (formDetail) {
                    _response = resolveObj.EXIST_REF_KEY
                } else {
                    let input = await db.Input.findOne({
                        where: {
                            id: inputId
                        },
                        include: [
                            {
                                model: db.Text_Input,
                                as: 'text_input'
                            },
                            {
                                model: db.Dropdown,
                                as: 'dropdown'
                            }
                        ]
                    })
                    if (!input) {
                        _response = resolveObj.NOT_FOUND('Input')
                    } else {
                        let _transaction_status = false
                        try {
                            await db.sequelize.transaction(async (t) => {
                                switch (input.typeInput) {
                                    case type.TEXT:
                                        let _del_text_translation_ti = await db.Text_Translation.destroy({
                                            where: {
                                                id: [input.text_input.title, input.text_input.placeHolder]
                                            },
                                            transaction: t
                                        })
                                        let _del_text_input = await db.Text_Input.destroy({
                                            where: {
                                                inputId: inputId
                                            },
                                            transaction: t
                                        })
                                        break;
                                    case type.DROPDOWN:
                                        let _del_text_translation_dd = await db.Text_Translation.destroy({
                                            where: {
                                                id: input.dropdown.title
                                            },
                                            transaction: t
                                        })
                                        let _del_rds_dd = await db.Row_Dataset_Dropdown.destroy({
                                            where: {
                                                dropdownId: input.dropdown.id
                                            },
                                            transaction: t
                                        })
                                        let _del_dropdown = await db.Dropdown.destroy({
                                            where: {
                                                inputId: inputId
                                            },
                                            transaction: t
                                        })
                                        break;
                                    default:
                                        // invalid type input
                                        throw new Error()
                                        break;
                                }
                                let _del_input = await db.Input.destroy({
                                    where: {
                                        id: inputId
                                    },
                                    transaction: t
                                });
                            })
                            _transaction_status = true
                        } catch (e) {
                            _transaction_status = false
                        }
                        if (_transaction_status) {
                            _response = resolveObj.DELETE_SUCCEED()
                        } else {
                            _response = resolveObj.DELETE_UNSUCCEED()
                        }
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

// text input

let checkTypeText = (type) => {
    if (!type) {
        return true
    }
    let arrType = ['email', 'phone']
    return arrType.includes(type)
}

let createTextInput = (data) => {
    return new Promise(async (resolve, reject) => {
        // data -> input -> text_input -> text_translation : titleEn || titleTh placeHolderEn placeHolderTh
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.titleEn) || !checkTypeText(data?.type)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _transaction_status = false
                try {
                    await db.sequelize.transaction(async (t) => {
                        let input = await db.Input.create({
                            typeInput: 'text'
                        }, { transaction: t });
                        let titleText_Translation = await db.Text_Translation.create({
                            valueEn: data.titleEn,
                            valueTh: data.titleTh ? data.titleTh : data.titleEn
                        }, { transaction: t })

                        let placeHolderText_Translation = await db.Text_Translation.create({
                            valueEn: data.placeHolderEn,
                            valueTh: data.placeHolderTh ? data.placeHolderTh : data.placeHolderEn
                        }, { transaction: t })
                        let textInput = await db.Text_Input.create({
                            title: titleText_Translation.id,
                            placeHolder: placeHolderText_Translation.id,
                            typeText: data.typeText,
                            inputId: input.id
                        }, { transaction: t });
                    })
                    _transaction_status = true
                } catch (e) {
                    _transaction_status = false
                }
                if (_transaction_status) {
                    _response = resolveObj.CREATE_SUCCEED()
                } else {
                    _response = resolveObj.CREATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let getAllTextInput = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Text_Input.findAll()
            let _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateTextInput = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id) ||
                !func.CHECK_HAS_VALUE_OR(data.titleEn, data.titleTh,
                    data.placeHolderEn, data.placeHolderTh, data.typeText) ||
                !checkTypeText(data.typeText)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _transaction_status = false
                try {
                    await db.sequelize.transaction(async (t) => {
                        let textInput = await db.Text_Input.findOne({ where: { id: data.id } })
                        await textInput.update({
                            typeText: data.typeText
                        }, { transaction: t })
                        if (func.CHECK_HAS_VALUE_OR(data.titleEn, data.titleTh)) {
                            let titleTextTranslation = await db.Text_Translation.findOne({ where: { id: textInput.title } })
                            await titleTextTranslation.update({
                                valueEn: data.titleEn,
                                valueTh: data.titleTh ? data.titleTh : data.titleEn
                            }, { transaction: t })
                        }
                        if (func.CHECK_HAS_VALUE_OR(data.placeHolderEn, data.placeHolderTh)) {
                            let placeHolderTextTranslation = await db.Text_Translation.findOne({ where: { id: textInput.placeHolder } })
                            await placeHolderTextTranslation.update({
                                valueEn: data.placeHolderEn,
                                valueTh: data.placeHolderTh ? data.placeHolderTh : data.placeHolderEn
                            }, { transaction: t })
                        }
                    })
                    _transaction_status = true
                } catch (e) {
                    _transaction_status = false
                }
                if (_transaction_status) {
                    _response = resolveObj.UPDATE_SUCCEED('Text_Input')
                } else {
                    _response = resolveObj.UPDATE_UNSUCCEED('Text_Input')
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

// dropdown

let createDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        // title dataDropdown ->  input -> title text_translation -> dropdown -> data dropdown
        try {
            let _response
            if (!data.titleEn) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _transaction_status = false
                try {
                    await db.sequelize.transaction(async (t) => {
                        let input = await db.Input.create({
                            typeInput: type.DROPDOWN
                        }, { transaction: t });
                        let titleText_Translation = await db.Text_Translation.create({
                            valueEn: data.titleEn,
                            valueTh: data.titleTh ? data.titleTh : data.titleEn
                        }, { transaction: t })
                        await db.Dropdown.create({
                            title: titleText_Translation.id,
                            inputId: input.id
                        }, { transaction: t })
                    })
                    _transaction_status = true
                } catch (e) {
                    _transaction_status = false
                }
                if (_transaction_status) {
                    _response = resolveObj.CREATE_SUCCEED()
                } else {
                    _response = resolveObj.CREATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let getDropdownById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let data = await db.Dropdown.findOne({
                    where: {
                        id: id
                    },
                    include: [
                        {
                            model: db.Row_Dataset_Dropdown, as: 'dataDropdown'
                        }
                    ]
                })
                _response = resolveObj.GET(data)
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.id) || !func.CHECK_HAS_VALUE_OR(data.titleEn, data.titleTh)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let dropdown = await db.Dropdown.findOne({ where: { id: data.id } })
                let titleTranslation = await db.Text_Translation.findOne({ where: { id: dropdown.title } })
                let _update_ttr = await titleTranslation.update({
                    valueEn: data.titleEn,
                    valueTh: data.titleTh,
                })
                if (_update_ttr) {
                    _response = resolveObj.UPDATE_SUCCEED()
                } else {
                    _response = resolveObj.UPDATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

// data dropdown

let addDataDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.dropdownId || !data.value || !data.label) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let dropdown = await db.Dropdown.findOne({
                    where: {
                        id: data.dropdownId
                    }
                })
                if (dropdown) {
                    let _rdd = await db.Row_Dataset_Dropdown.create({
                        value: data.value,
                        label: data.label,
                        dropdownId: data.dropdownId
                    })
                    if (_rdd) {
                        _response = resolveObj.CREATE_SUCCEED()
                    } else {
                        _response = resolveObj.CREATE_UNSUCCEED()
                    }
                } else {
                    _response = resolveObj.NOT_FOUND('Dropdown')
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteDataDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _del_rdd = await db.Row_Dataset_Dropdown.destroy({ where: { id: data.id } })
                if (_del_rdd >= 1) {
                    _response = resolveObj.DELETE_SUCCEED()
                } else {
                    _response = resolveObj.DELETE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let fetchData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.sequelize.transaction(async (t) => {
                let data = await db.Text_Translation.findAll()
                if (data.length > 0) throw new Error()
                await db.Text_Translation.truncate();

                await db.Text_Translation.bulkCreate([
                    { valueTh: "คำนำหน้า", valueEn: "Title" },

                    { valueTh: "ชื่อจริงและชื่อกลาง (กรอกเป็นภาษาอังกฤษ)", valueEn: "Middle and Given Name" },
                    { valueTh: "นามสกุล (กรอกเป็นภาษาอังกฤษ)", valueEn: "Family Name" },
                    { valueTh: "ที่อยู่อีเมล์", valueEn: "Email" },
                    { valueTh: "เบอร์โทรศัพท์", valueEn: "Phone" },
                    { valueTh: "Passenger Middle and Given Name", valueEn: "Passenger Middle and Given Name" },
                    { valueTh: "Passenger Family Name", valueEn: "Passenger Family Name" },

                    { valueTh: "Enter your middle and given name", valueEn: "Enter your middle and given name" },
                    { valueTh: "Enter your name", valueEn: "Enter your name" },
                    { valueTh: "Enter your email", valueEn: "Enter your email" },
                    { valueTh: "eg. +665555551212", valueEn: "eg. +665555551212" },
                    { valueTh: "Enter Passenger middle and given name", valueEn: "Enter Passenger middle and given name" },
                    { valueTh: "Enter Passenger Name", valueEn: "Enter Passenger Name" },

                    { valueTh: "Power Pack Love Connection", valueEn: "Power Pack Love Connection" },
                    { valueTh: "Covid Test Voucher", valueEn: "Covid Test Voucher" },
                    { valueTh: "SkyFUN Insurance", valueEn: "SkyFUN Insurance" },
                    { valueTh: "Hotel Voucher", valueEn: "Hotel Voucher" },
                    { valueTh: "Travel Voucher", valueEn: "Travel Voucher" },

                    { valueTh: "โปรโมชัน", valueEn: "Promotion" },
                    { valueTh: "เอกสารที่ใช้ในการเดินทาง", valueEn: "Travel Document" },
                    { valueTh: "สนามบินและอาคารผู้โดยสาร", valueEn: "Airports and Terminal" },
                    { valueTh: "ใบกำกับภาษี", valueEn: "Tax Invoice" },
                    { valueTh: "การเลือกที่นั่ง", valueEn: "Seat selection" },
                    { valueTh: "ผู้โดยสารที่ต้องการความช่วยเหลือพิเศษ", valueEn: "Physically Challenged Passenger" },
                    { valueTh: "สินค้า อาหารเเละเครื่องดื่ม", valueEn: "Products Foods and Beverage" },
                    { valueTh: "จัดส่งสัมภาระ", valueEn: "Baggage service" },
                    { valueTh: "SKY BOSS", valueEn: "SKY BOSS" },

                    { valueTh: "English", valueEn: "English" },
                    { valueTh: "ภาษาไทย", valueEn: "Thai" },

                    { valueTh: "การจองของฉัน", valueEn: "My Bookings" },
                    { valueTh: "Shopping", valueEn: "Shopping" },
                    { valueTh: "ข้อมูลการเดินทาง", valueEn: "Travel Info" },
                    { valueTh: "เช็คอินออนไลน์", valueEn: "Web Check-in" },
                    { valueTh: "Language", valueEn: "Language" },
                ])
            })

            resolve({
                errCode: 0,
                errMessage: 'Ok',
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createForm,
    getForm,
    updateForm,
    deleteForm,

    getAllFormDetail,
    getFormDetailByFormId,
    addInputIntoForm,
    updateFormDetail,
    deleteFormDetail,

    getInput,
    deleteInputById,

    // text input
    createTextInput,
    getAllTextInput,
    updateTextInput,

    // dropdown
    createDropdown,
    getDropdownById,

    // data dropdown
    updateDropdown,
    addDataDropdown,
    deleteDataDropdown,

    fetchData
}