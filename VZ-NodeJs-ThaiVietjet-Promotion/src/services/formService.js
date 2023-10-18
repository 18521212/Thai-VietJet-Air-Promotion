const db = require('../models');
const { resolveObj, func, type } = require('../utils');

// form

let createForm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
            } else {
                await db.Form.create({
                    name: data.name,
                    css: data.css
                })

                resolve(resolveObj.CREATE_SUCCEED())
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllForm = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Form.findAll({
                include: [
                    { model: db.Form_Detail, as: 'form_detail' }
                ]
            })
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e)
        }
    })
}

let getFormById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve(resolveObj.MISSING_PARAMETERS)
            }
            let data = await db.Form.findOne({ where })
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e)
        }
    })
}

let updateForm = data => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id, data.name)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let form = await db.Form.findOne({ where: { id: data.id } })
                await form.update({
                    name: data.name
                })
            })
            resolve(resolveObj.UPDATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let deleteForm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve(resolveObj.MISSING_PARAMETERS)
            }
            await db.sequelize.transaction(async (t) => {
                await db.Form_Detail.destroy({ where: { formId: id }, transaction: t })
                let formDetail = await db.Form_Detail.findAll({ where: { formId: id } })
                if (formDetail.length > 0) {
                    resolve(resolveObj.EXIST_REF_KEY)
                    throw new Error()
                }
                let data = await db.Form.destroy({ where: { id: id }, transaction: t })
                if (data === 0) {
                    resolve(resolveObj.DELETE_UNSUCCEED())
                }
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e)
        }
    })
}

// form detail

let getAllFormDetail = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Form_Detail.findAll()
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e)
        }
    })
}

let getFormDetailByFormId = (formId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!formId) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            let data = await db.Form_Detail.findAll({
                where: { formId: formId },
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
            func.ORDER(data, 'order', 'asc')
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e)
        }
    })
}

let addInputIntoForm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.formId || !data.inputId) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
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
                    !form && resolve(resolveObj.NOT_FOUND('Form'))
                    !input && resolve(resolveObj.NOT_FOUND('Input'))
                    throw new Error()
                }
                await db.Form_Detail.create({
                    formId: data.formId,
                    inputId: data.inputId,
                    order: data.order ? data.order : undefined,
                    widthMdScreen: data.widthMdScreen ? data.widthMdScreen : undefined
                }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED())
        } catch (e) {
            reject(e)
        }
    })
}

let updateFormDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || (!data.order && !data.widthMdScreen && !data.inputId)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let formDetail = await db.Form_Detail.findOne({
                    where: { id: data.id },
                })
                if (!formDetail) { resolve(resolveObj.NOT_FOUND('Form Detail')); throw new Error() }
                if (data.inputId) {
                    let input = await db.findOne({ where: { id: data.inputId } })
                    if (!input) {
                        resolve(resolveObj.NOT_FOUND('Input'))
                        throw new Error()
                    }
                }
                await formDetail.update({
                    inputId: data.inputId,
                    order: data.order && data.order,
                    widthMdScreen: data.widthMdScreen && data.widthMdScreen
                }, { transaction: t })

                await formDetail.save({ transaction: t })
            })
            resolve(resolveObj.UPDATE_SUCCEED('Form Detail'))
        } catch (e) {
            reject(e)
        }
    })
}

let deleteFormDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                await db.Form_Detail.destroy({
                    where: {
                        id: data.id
                    },
                    transaction: t
                })
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e)
        }
    })
}

// input

let getAllInput = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Input.findAll({
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
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getInputById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            let data = await db.Input.findOne({
                where: { id: id },
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
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data: data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let deleteInputById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        // !formDetail -> input -> text_translation /d -> || /d row_data_dropdown /d -> input /d
        try {
            if (!inputId) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let formDetail = await db.Form_Detail.findOne({
                    where: {
                        inputId: inputId
                    }
                })
                if (formDetail) {
                    resolve(resolveObj.EXIST_REF_KEY)
                    throw new Error()
                }
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
                    resolve(resolveObj.NOT_FOUND('Input'))
                    throw new Error()
                }
                switch (input.typeInput) {
                    case type.TEXT:
                        await db.Text_Translation.destroy({
                            where: {
                                id: [input.text_input.title, input.text_input.placeHolder]
                            },
                            transaction: t
                        })
                        await db.Text_Input.destroy({
                            where: {
                                inputId: inputId
                            },
                            transaction: t
                        })
                        break;
                    case type.DROPDOWN:
                        await db.Text_Translation.destroy({
                            where: {
                                id: input.dropdown.title
                            },
                            transaction: t
                        })
                        await db.Row_Dataset_Dropdown.destroy({
                            where: {
                                dropdownId: input.dropdown.id
                            },
                            transaction: t
                        })
                        await db.Dropdown.destroy({
                            where: {
                                inputId: inputId
                            },
                            transaction: t
                        })
                        break;
                    default:
                        resolve(resolveObj.ERROR(1, 'Invalid typeInput'))
                        throw new Error()
                        break;
                }
                await db.Input.destroy({
                    where: {
                        id: inputId
                    }
                }, { transaction: t })
            })
            resolve(resolveObj.DELETE_SUCCEED())
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
    let arrType = ['email']
    return arrType.includes(type)
}

let createTextInput = (data) => {
    return new Promise(async (resolve, reject) => {
        // data -> input -> text_input -> text_translation : titleEn || titleTh placeHolderEn placeHolderTh
        try {
            if (!func.CHECK_HAS_VALUE(data.titleEn) || !checkTypeText(data?.type)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
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
                }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED())
        } catch (e) {
            reject(e)
        }
    })
}

let getAllTextInput = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Text_Input.findAll()

            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateTextInput = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id) ||
                !func.CHECK_HAS_VALUE_OR(data.titleEn, data.titleTh,
                    data.placeHolderEn, data.placeHolderTh, data.typeText) ||
                !checkTypeText(data.typeText)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
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
            resolve(resolveObj.UPDATE_SUCCEED('Text_Input'))
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
            if (!data.titleEn) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            let id
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
                id = input.id
            })
            resolve(resolveObj.CREATE_SUCCEED('', { id: id }))
        } catch (e) {
            reject(e);
        }
    })
}

let getDropdownById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
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

                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!func.CHECK_HAS_VALUE(data.id) || !func.CHECK_HAS_VALUE_OR(data.titleEn, data.titleTh)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let dropdown = await db.Dropdown.findOne({ where: { id: data.id } })
                let titleTranslation = await db.Text_Translation.findOne({ where: { id: dropdown.title } })
                await titleTranslation.update({
                    valueEn: data.titleEn,
                    valueTh: data.titleTh,
                }, { transaction: t })
            })
            resolve(resolveObj.UPDATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

// data dropdown

let addDataDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.dropdownId || !data.value || !data.label) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let dropdown = await db.Dropdown.findOne({
                    where: {
                        id: data.dropdownId
                    }
                })
                if (!dropdown) {
                    resolve(resolveObj.NOT_FOUND('Dropdown'))
                    throw new Error()
                }
                await db.Row_Dataset_Dropdown.create({
                    value: data.value,
                    label: data.label,
                    dropdownId: data.dropdownId
                }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

let deleteDataDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let deleted = await db.Row_Dataset_Dropdown.destroy({ where: { id: data.id }, transaction: t })
                if (deleted === 0) {
                    resolve(resolveObj.DELETE_UNSUCCEED)
                    throw new Error()
                }
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

// pack

let createPack = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.maxNumber || !data.price
                || !data.numberRedeem) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                // create pack
                await db.Pack.create({
                    name: data.name,
                    maxNumber: data.maxNumber,
                    price: data.price,
                    currency: data.currency,
                    numberRedeem: data.numberRedeem
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create pack succeed'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllPack = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Pack.findAll()

            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deletePackById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing required parameters',
                })
                return;
            }
            await db.Pack.destroy({
                where: {
                    id: id
                }
            })

            resolve({
                errCode: 0,
                errMessage: `Remove pack with id: ${id} succeed`,
            })
        } catch (e) {
            reject(e);
        }
    })
}

let fetchData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.sequelize.transaction(async (t) => {
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
    createForm: createForm,
    getAllForm: getAllForm,
    getFormById: getFormById,
    updateForm,
    deleteForm,

    getAllFormDetail: getAllFormDetail,
    getFormDetailByFormId,
    addInputIntoForm: addInputIntoForm,
    updateFormDetail: updateFormDetail,
    deleteFormDetail: deleteFormDetail,

    getAllInput: getAllInput,
    getInputById,
    deleteInputById: deleteInputById,

    // text input
    createTextInput: createTextInput,
    getAllTextInput: getAllTextInput,
    updateTextInput,

    // dropdown
    createDropdown: createDropdown,
    getDropdownById: getDropdownById,

    // data dropdown
    updateDropdown,
    addDataDropdown,
    deleteDataDropdown,

    createPack: createPack,
    getAllPack: getAllPack,
    deletePackById: deletePackById,

    fetchData: fetchData
}