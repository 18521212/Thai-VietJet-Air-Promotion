const db = require('../models');
const { resolveObj, func, type } = require('../utils');
import { getInput } from '../services/formService';
import { getPack } from '../services/promotionService';
import { Pack, PackArray } from '../class/Pack/Pack';
var crypto = require('crypto');

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

const capitalizeString = (str) => {
    // Split the string into words using spaces as the delimiter
    const words = str.split(' ');

    // Capitalize each word and join them back together with spaces
    const capitalizedWords = words.map(word => _.capitalize(word)).join(' ');

    return capitalizedWords;
};

const validateCustomerInput = async (req, res, next) => {
    try {
        // console.log('payment infor:', req.body)
        let customer = req.body?.payment?.customer
        // console.log('cus', customer) //
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
                console.log('type', typeText)
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
                    if (validator.isAlpha(valueText, 'en-US', { ignore: ' ' }) === false || valueText !== capitalizeString(valueText)) {
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
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.ERROR_SERVER)
    }
}

let roundNumber = (number, round) => {
    return Number(parseFloat(number).toFixed(2));
}

// let secureHash = (totalPriceInVat) => {
//     let MID = process.env.MID
//     let MREF = '0' // order id
//     let currencyCode = 764 // THB
//     let amount = totalPriceInVat // total price included vat
//     let paymentType = 'N' // normal
//     let secretKey = process.env.SECRET_KEY
//     let string = `${MID}|${MREF}|${currencyCode}|${amount}|${paymentType}|${secretKey}`
//     let encode = crypto.createHash('sha512').update(String(string)).digest('hex')
//     return encode
// }

const validatePack = async (req, res, next) => {
    let pack = req.body.payment.pack
    if (!pack) { return res.status(200).json(resolveObj.MISSING_PARAMETERS) }
    let keyArr = Object.getOwnPropertyNames(pack)
    let idArr = getIdArr(keyArr)
    let packs = await getPack(idArr)
    let packObjArr = []
    let unitPricesObj = {}
    for (let i = 0; i < keyArr.length; i++) {
        let packObj = new Pack(packs.data[i])
        packObj.setSentNumber(pack[keyArr[i]])
        unitPricesObj[packObj.id] = packObj.price
        packObjArr.push(packObj)
    }
    let packArr = new PackArray(packObjArr)
    let validatePackNum = packArr.checkNumberPack()
    if (validatePackNum[0] === false) {
        return res.status(200).json({
            errCode: 1,
            errMessage: validatePackNum[1]
        })
    }

    // re calculate
    let price = req.body.payment.price
    price.total = roundNumber(price.total, 2)
    price.vat = roundNumber(price.vat, 2)
    if (packArr.totalPriceInVat !== price.total || packArr.totalVatFee !== price.vat) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'total, vat incorrect'
        })
    }
    let validatePayment = {
        totalPriceInVat: packArr.totalPriceInVat,
        totalVatFee: packArr.totalVatFee
    }
    res.productArr = packArr.packArr
    req.body.payment.unitPricesPack = unitPricesObj
    // console.log('payment infor2:', req.body)
    res.validatePayment = validatePayment
    // console.log('vapayment', validatePayment)

    // let encode = secureHash(validatePayment.totalPriceInVat)
    // res.secureHash = encode

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