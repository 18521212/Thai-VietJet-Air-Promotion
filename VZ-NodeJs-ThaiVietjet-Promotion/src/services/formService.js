const db = require('../models');

// form section

let createFormSection = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing required parameters',
                })
            } else {
                await db.Form_Section.create({
                    title: data.title,
                    instruct: data.instruct,
                    customer_form_id: data.customer_form_id,
                    frame_card_id: data.frame_card_id,
                    breakdownId: data.breakdownId,
                    checkboxId: data.checkboxId,
                    button_submit_id: data.button_submit_id,
                    name: data.name
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create form section succeed',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
} // need to edit form section table

let getAllFormSection = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Form_Section.findAll({
                include: [
                    {
                        model: db.Form,
                        include: [
                            {
                                model: db.Form_Detail, as: 'Form_Detail',
                                include: [
                                    {
                                        model: db.Input,
                                        include: [
                                            {
                                                model: db.Text_Input,
                                                include: [
                                                    { model: db.Text_Translation, as: 'titleDataText_Input' },
                                                    { model: db.Text_Translation, as: 'placeHolderDataText_Input' }
                                                ]
                                            },
                                            {
                                                model: db.Dropdown,
                                                include: [
                                                    { model: db.Row_Dataset_Dropdown, as: 'dataDropdown' },
                                                    { model: db.Text_Translation, as: 'titleDataDropdown' }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })

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

let getFormSectionById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing required parameters',
                })
            }
            else {
                let data = await db.Form_Section.findOne({
                    where: {
                        id: id
                    },
                    include: [
                        {
                            model: db.Form,
                            include: [
                                {
                                    model: db.Form_Detail, as: 'Form_Detail',
                                    include: [
                                        {
                                            model: db.Input,
                                            include: [
                                                {
                                                    model: db.Text_Input,
                                                    include: [
                                                        { model: db.Text_Translation, as: 'titleDataText_Input' },
                                                        { model: db.Text_Translation, as: 'placeHolderDataText_Input' }
                                                    ]
                                                },
                                                {
                                                    model: db.Dropdown,
                                                    include: [
                                                        { model: db.Row_Dataset_Dropdown, as: 'dataDropdown' },
                                                        { model: db.Text_Translation, as: 'titleDataDropdown' }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
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

// form

let createForm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })
            } else {
                await db.Form.create({
                    name: data.name,
                    css: data.css
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create new form succeed',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllForm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Form.findAll()

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

// form detail

let getAllFormDetail = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Form_Detail.findAll()

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

let addInputIntoForm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.formId || !data.inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                //check form, input is exist
                let form = await db.Form.findOne({
                    where: {
                        id: data.formId
                    }
                })
                let input = await db.Input.findOne({
                    where: {
                        id: data.inputId
                    },
                    include: [
                        {
                            model: db.Text_Input
                        },
                        {
                            model: db.Dropdown
                        }
                    ]
                })//

                let valid = 1;
                if (!form) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Form does not exist'
                    })
                    valid = 0;
                }
                if (!input) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Input does not exist in ' + data.typeInput + ' table'
                    })
                    valid = 0;
                } else {
                    if (!input.Dropdown && !input.Text_Input) {
                        resolve({
                            errCode: 2,
                            errMessage: 'Input exist but does not have input instance, please check inputId of input instance'
                        })
                        valid = 0;
                    }
                }
                if (valid === 1) {
                    let formDetail = await db.Form_Detail.create({
                        formId: data.formId,
                        inputId: data.inputId,
                        order: data.order,
                        widthMdScreen: data.widthMdScreen
                    })

                    resolve({
                        errCode: 0,
                        errMessage: `Create Form Detail with inputId: ${formDetail.inputId}, formId: ${formDetail.formId} succeed`
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateFormDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.formId || !data.inputId || (!data.order && !data.widthMdScreen)) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let formDetail = await db.Form_Detail.findOne({
                    where: {
                        formId: data.formId,
                        inputId: data.inputId,
                    },
                })

                const result = db.sequelize.transaction(async (t) => {
                    await formDetail.update({
                        order: data.order && data.order,
                        widthMdScreen: data.widthMdScreen && data.widthMdScreen
                    }, { transaction: t })

                    await formDetail.save({ transaction: t })

                    formDetail = await db.Form_Detail.findOne({
                        where: {
                            formId: data.formId,
                            inputId: data.inputId,
                        },
                    }, { transaction: t })
                })

                resolve({
                    errCode: 0,
                    errMessage: `Update new input order: ${formDetail.order} succeed`
                }) // check already update or not
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteFormDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.formId || !data.inputId) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing required parameters',
                })
            } else {
                await db.Form_Detail.destroy({
                    where: {
                        formId: data.formId,
                        inputId: data.inputId
                    }
                })

                resolve({
                    errCode: 0,
                    errMessage: `Remove Form Detail with formId: ${data.formId}, inputId: ${data.inputId} succeed`,
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

// input

let getAllInput = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Input.findAll()
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

let deleteInputById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 0,
                    errMessage: 'Missing required parameters',
                })
            } else {
                // check form detail exist input
                let formDetail = await db.Form_Detail.findOne({
                    where: {
                        inputId: inputId
                    }
                })
                if (formDetail) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Input exist in table Form Detail, please delete Input in table Form Detail first',
                    })
                    return;
                }

                let input = await db.Input.findOne({
                    where: {
                        id: inputId
                    },
                    include: [
                        {
                            model: db.Text_Input
                        },
                        {
                            model: db.Dropdown
                        }
                    ]
                })
                if (!input) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Input does not exist',
                    })
                    return;
                }

                const result = await db.sequelize.transaction(async (t) => {
                    await db.Input.destroy({
                        where: {
                            id: inputId
                        }
                    }, { transaction: t })

                    if (input.typeInput === 'text') {
                        // delete text_translation text, placeHolder
                        await db.Text_Translation.destroy({
                            where: {
                                id: [input.Text_Input.title, input.Text_Input.placeHolder]
                            }
                        }, { transaction: t })

                        // delete text input
                        await db.Text_Input.destroy({
                            where: {
                                inputId: inputId
                            }
                        }, { transaction: t })

                    } else if (input.typeInput === 'dropdown') {
                        // delete text_translation dropdown
                        await db.Text_Translation.destroy({
                            where: {
                                id: input.Dropdown.title
                            }
                        }, { transaction: t })

                        // delete datadropdown
                        await db.Row_Dataset_Dropdown.destroy({
                            where: {
                                dropdownId: input.Dropdown.id
                            }
                        }, { transaction: t })

                        // delete dropdown
                        await db.Dropdown.destroy({
                            where: {
                                inputId: inputId
                            }
                        }, { transaction: t })

                    } else {
                        resolve({
                            errCode: 0,
                            errMessage: `Type Input: ${input.typeInput} does not exist, please choose another Type Input`,
                        })
                        return;
                    }
                })

                resolve({
                    errCode: 0,
                    errMessage: `Delete Input with id: ${inputId} succeed`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
} // transaction

// text input

let createTextInput = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let textInput;
                const result = await db.sequelize.transaction(async (t) => {
                    // create input, input instance
                    let input = await db.Input.create({
                        typeInput: 'text'
                    }, { transaction: t });

                    let titleText_Translation = await db.Text_Translation.create({
                        valueEn: data.title,
                        valueTh: data.titleTh ? data.titleTh : data.title
                    }, { transaction: t })

                    let placeHolderText_Translation = await db.Text_Translation.create({
                        valueEn: data.placeHolder,
                        valueTh: data.placeHolderTh ? data.placeHolderTh : data.placeHolder
                    }, { transaction: t })

                    textInput = await db.Text_Input.create({
                        title: titleText_Translation.id,
                        placeHolder: placeHolderText_Translation.id,
                        typeText: data.typeText,
                        inputId: input.id
                    }, { transaction: t })
                })

                resolve({
                    errCode: 0,
                    errMessage: `Create new Text Input with inputId: ${textInput.inputId} succeed`
                })
            }
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

// dropdown

let createDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let dropdown;
                const result = await db.sequelize.transaction(async (t) => {
                    // create input, input instance
                    let input = await db.Input.create({
                        typeInput: 'dropdown'
                    }, { transaction: t });

                    let titleText_Translation = await db.Text_Translation.create({
                        valueEn: data.title,
                        valueTh: data.titleTh ? data.titleTh : data.title
                    }, { transaction: t })

                    dropdown = await db.Dropdown.create({
                        title: titleText_Translation.id,
                        inputId: input.id // check procedure roll back if input.id incorrect
                    }, { transaction: t })
                })

                resolve({
                    errCode: 0,
                    errMessage: `Create new Dropdown with inputId: ${dropdown.inputId} succeed`
                })
            }
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

let createRowDataDropdown = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.dropdownId || !data.value || !data.label) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                // check exist dropdown
                let dropdown = await db.Dropdown.findOne({
                    where: {
                        id: data.dropdownId
                    }
                })
                if (!dropdown) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Dropdown does not exist',
                    })
                } else {
                    await db.Row_Dataset_Dropdown.create({
                        value: data.value,
                        label: data.label,
                        dropdownId: data.dropdownId
                    })

                    resolve({
                        errCode: 0,
                        errMessage: 'Add new row data into a dropdown succeed',
                    })
                }
            }
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
    createFormSection: createFormSection,
    getAllFormSection: getAllFormSection,
    getFormSectionById: getFormSectionById,

    createForm: createForm,
    getAllForm: getAllForm,

    getAllFormDetail: getAllFormDetail,
    addInputIntoForm: addInputIntoForm,
    updateFormDetail: updateFormDetail,
    deleteFormDetail: deleteFormDetail,

    getAllInput: getAllInput,
    deleteInputById: deleteInputById,

    createTextInput: createTextInput,
    getAllTextInput: getAllTextInput,

    createDropdown: createDropdown,
    getDropdownById: getDropdownById,
    createRowDataDropdown: createRowDataDropdown,

    createPack: createPack,
    getAllPack: getAllPack,
    deletePackById: deletePackById,

    fetchData: fetchData
}