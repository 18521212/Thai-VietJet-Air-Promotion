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
}

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
                                                model: db.Text_Input
                                            },
                                            {
                                                model: db.Dropdown,
                                                include: [
                                                    {
                                                        model: db.Row_Dataset_Dropdown, as: 'dataDropdown'
                                                    }
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
                                                    model: db.Text_Input
                                                },
                                                {
                                                    model: db.Dropdown,
                                                    include: [
                                                        {
                                                            model: db.Row_Dataset_Dropdown, as: 'dataDropdown'
                                                        }
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
                        widthXLScreen: data.widthXLScreen
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
            if (!data.formId || !data.inputId || (!data.order && !data.widthXLScreen)) {
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

                await formDetail.update({
                    order: data.order && data.order,
                    widthXLScreen: data.widthXLScreen && data.widthXLScreen
                })

                await formDetail.save()

                formDetail = await db.Form_Detail.findOne({
                    where: {
                        formId: data.formId,
                        inputId: data.inputId,
                    },
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
                } else {
                    let valid = 1;
                    if (input.typeInput === 'text') {
                        // delete text input
                        await db.Text_Input.destroy({
                            where: {
                                inputId: inputId
                            }
                        })
                        resolve({
                            errCode: 0,
                            errMessage: `Delete text input with inputId: ${inputId} succeed`,
                        })
                    } else if (input.typeInput === 'dropdown') {
                        // delete dropdown
                        await db.Dropdown.destroy({
                            where: {
                                inputId: inputId
                            }
                        })
                        resolve({
                            errCode: 0,
                            errMessage: 'Ok',
                        })
                    } else {
                        resolve({
                            errCode: 0,
                            errMessage: `Type Input: ${input.typeInput} does not exist, please choose another Type Input`,
                        })
                        valid = 0;
                    }

                    if (valid === 1) {
                        // delete input
                        await db.Input.destroy({
                            where: {
                                id: inputId
                            }
                        })
                    }
                    // procedure check callback
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

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
                // create input, input instance
                let input = await db.Input.create({
                    typeInput: 'text'
                });
                let textInput = await db.Text_Input.create({
                    title: data.title,
                    placeHolder: data.placeHolder,
                    typeText: data.typeText,
                    inputId: input.id
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
            let data = await db.Text_Input.findAll({

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
                // create input, input instance
                let input = await db.Input.create({
                    typeInput: 'dropdown'
                });
                let dropdown = await db.Dropdown.create({
                    title: data.title,
                    inputId: input.id // check procedure roll back if input.id incorrect
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
}