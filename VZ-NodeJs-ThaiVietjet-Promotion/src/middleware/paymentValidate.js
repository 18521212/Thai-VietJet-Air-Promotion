const db = require('../models');
const { resolveObj, func, type } = require('../utils');
import { getInput } from '../services/formService';
import { getPack } from '../services/promotionService';
import { Pack, PackArray } from '../class/Pack/Pack';

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
        let customer = req.body?.payment?.customer
        if (!customer) { return res.status(200).json(resolveObj.MISSING_PARAMETERS) }
        let keyArr = Object.getOwnPropertyNames(customer)
        let idArr = getIdArr(keyArr)
        let inputs = await getInput(idArr)
        let validateInput = true
        let errMessage = ''
        for (let i = 0; i < keyArr.length; i++) {
            let typeInput = inputs.data[i].typeInput
            let valueText = customer[keyArr[i]]
            if (typeInput === 'text') {
                let typeText = inputs.data[i].text_input.typeText
                if (typeText === 'email') {
                    // validate email
                    // TODO: verify existence of email
                    if (validator.isEmail(valueText) === false) {
                        validateInput = false
                        errMessage = 'invalid email'
                        break
                    }
                } else if (typeText === 'phone') {
                    console.log('phone', valueText.startsWith('+66'), valueText.length)
                    if (
                        validator.isNumeric(valueText) == false
                        || !((valueText.startsWith('0') && valueText.length == 10) || (valueText.startsWith('+66') && valueText.length == 12))
                    ) {
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
            res.data = {
                errCode: 1,
                errMessage: errMessage
            }
            return res.status(200).json(res.data)
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

const validatePack = async (req, res, next) => {
    let pack = req.body.payment.pack
    if (!pack) { return res.status(200).json(resolveObj.MISSING_PARAMETERS) }
    let keyArr = Object.getOwnPropertyNames(pack)
    let idArr = getIdArr(keyArr)
    let packs = await getPack(idArr)
    let packObjArr = []
    let unitPricesObj = {}
    let vatPack = {}
    for (let i = 0; i < keyArr.length; i++) {
        let packObj = new Pack(packs.data[i])
        packObj.setSentQuantity(pack[keyArr[i]])
        unitPricesObj[packObj.id] = packObj.price
        vatPack[packObj.id] = packObj.vat
        packObjArr.push(packObj)
    }
    let packArr = new PackArray(packObjArr)
    let validatePackNum = packArr.checkQuantityPack()
    if (validatePackNum[0] === false) {
        res.data = {
            errCode: 1,
            errMessage: validatePackNum[1]
        }
        return res.status(200).json(res.data)
    }

    // re calculate
    let price = req.body.payment.price
    price.total = roundNumber(price.total, 2)
    price.vat = roundNumber(price.vat, 2)
    if (packArr.totalPriceInVat !== price.total || packArr.totalVatFee !== price.vat) {
        res.data = {
            errCode: 1,
            errMessage: 'total, vat incorrect'
        }
        return res.status(200).json(res.data)
    }
    let validatePayment = {
        totalPriceInVat: packArr.totalPriceInVat,
        totalVatFee: packArr.totalVatFee
    }
    res.productArr = packArr.packArr
    req.body.payment.unitPricesPack = unitPricesObj
    req.body.payment.vatPack = vatPack
    res.validatePayment = validatePayment
    next()
}

module.exports = {
    validateCustomerInput,
    validatePack,
}