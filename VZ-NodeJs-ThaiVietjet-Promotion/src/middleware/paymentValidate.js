const db = require('../models');
const { resolveObj, func, type } = require('../utils');
import { getInput } from '../services/formService';
import { getPack } from '../services/promotionService';
import { Pack } from '../class/Pack/Pack';

import _ from 'lodash';
import validator from 'validator';

let getIdArr = (object) => {
    let resultIdArr = []
    for (let i = 0; i < object.length; i++) {
        let id = object[i].split('-', 2)[1]
        resultIdArr.push(id)
    }
    return resultIdArr
}

const validateCustomerInput = async (req, res, next) => {
    try {
        // console.log('payment infor:', req.body)
        let customer = req.body?.payment?.customer
        if (!customer) { return res.status(200).json(resolveObj.MISSING_PARAMETERS) }
        let keyArr = Object.getOwnPropertyNames(customer)
        // console.log('keyrr', keyArr)
        let idArr = getIdArr(keyArr)
        // console.log('idrr', idArr)
        let inputs = await getInput(idArr)
        // console.log('inputs', inputs.data)
        let validateInput = true
        let errMessage = ''
        for (let i = 0; i < keyArr.length; i++) {
            let typeInput = inputs.data[i].typeInput
            let valueText = customer[keyArr[i]]
            // console.log('val', valueText, _.upperCase(valueText))
            if (typeInput === 'text') {
                let typeText = inputs.data[i].text_input.typeText
                // console.log('type', typeText)
                if (typeText === 'email') {
                    // validate email
                    if (validator.isEmail(valueText) === false) {
                        validateInput = false
                        errMessage = 'invalid email'
                        break
                    }
                } else if (typeText === 'phone') {
                    // if (validator.isNumeric(valueText) === false || valueText.length !== 10) {
                    //     validateInput = false
                    //     errMessage = 'invalid phone'
                    //     break
                    // }
                    if (validator.isMobilePhone(valueText, 'th-TH')) {
                        validateInput = false
                        errMessage = 'invalid phone'
                        break
                    }
                } else {
                    // validate text
                    if (validator.isAlpha(valueText) === false || valueText !== _.capitalize(valueText)) {
                        validateInput = false
                        errMessage = 'invalid text'
                        break
                    }
                }
            } else if (typeInput === 'dropdown') {
                // validate dropdown
                if (typeof (valueText) !== 'string') {
                    validateInput = false
                    break
                }
            }
        }
        if (validateInput === false) {
            return res.status(200).json({
                errCode: 1,
                errMessage: errMessage
            })
        }

        // return res.status(200).json({
        //     errCode: 0,
        //     errMessage: 'test'
        // },)
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let roundNumber = (number, round) => {
    return parseFloat(number).toFixed(2);
}

const validatePack = async (req, res, next) => {
    let pack = req.body.payment.pack
    if (!pack) { return res.status(200).json(resolveObj.MISSING_PARAMETERS) }
    let keyArr = Object.getOwnPropertyNames(pack)
    let idArr = getIdArr(keyArr)
    let packs = await getPack(idArr)
    let validatePack = true
    let errMessage = ''
    let totalNumber = 0
    let packObjArr = []
    for (let i = 0; i < keyArr.length; i++) {
        let packObj = new Pack(packs.data[i])
        packObj.setSentNumber(pack[keyArr[i]])
        packObjArr.push(packObj)

        totalNumber += packObj.sentNumber
        let validatePackNum = packObj.checkNumberPack()
        if (validatePackNum[0] === false) {
            validatePack = false
            errMessage = validatePackNum[1]
            break
        }
    }
    if (totalNumber <= 0) {
        validatePack = false
        errMessage = 'invalid total number'
    }
    if (validatePack === false) {
        return res.status(200).json({
            errCode: 1,
            errMessage: errMessage
        })
    }
    // re calculate
    let totalIncludeVat = 0, totalVatFee = 0
    for (let i = 0; i < keyArr.length; i++) {
        totalVatFee += packObjArr[i].calcVatFee()
        totalIncludeVat += packObjArr[i].calcPriceInVat()
    }
    let validatePayment = {
        totalVAT: roundNumber(totalIncludeVat, 2),
        vat: roundNumber(totalVatFee, 2)
    }
    let price = req.body.payment.price
    price.total = roundNumber(price.total, 2)
    price.vat = roundNumber(price.vat, 2)
    if (validatePayment.totalVAT !== price.total || validatePayment.vat !== price.vat) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'total, vat incorrect'
        })
    }
    console.log('payment infor2:', req.body)
    res.validatePayment = validatePayment
    console.log('vapayment', validatePayment)
    // return res.status(200).json({
    //     errCode: 0,
    //     errMessage: 'test' + JSON.stringify(validatePayment)
    // },)
    next()
}

module.exports = {
    validateCustomerInput,
    validatePack,
}