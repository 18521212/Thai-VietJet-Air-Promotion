class Pack {
    constructor(pack) {
        this.id = pack?.id
        this.name = pack?.name
        this.price = pack?.price
        this.maxNumber = pack?.maxNumber
        this.vat = pack?.vat
        this.currency = pack?.currency
        this.sentNumber = 0
        this.totalPriceInVat = 0
    }

    calcPrice() {
        this.totalPriceInVat = this.calcPriceInVat()
    }

    setSentNumber(sentNumber) {
        if (this.checkNumberPack(sentNumber)[0]) {
            this.sentNumber = sentNumber
            this.calcPrice()
        }
    }

    checkNumberPack(numberPack = this.sentNumber) {
        let valid = true, errMessage = ''
        if (numberPack < 0) {
            valid = false
            errMessage = 'invalid number pack'
        } else if (numberPack > this.maxNumber) {
            valid = false
            errMessage = 'exceed max number allow'
        }
        return [valid, errMessage]
    }

    calcPriceInVat() {
        let priceExVat = this.calcPriceExVat()
        let vatFee = this.calcVatFee()
        let priceInVat = priceExVat + vatFee
        return priceInVat
    }

    calcPriceExVat() {
        let priceExVat = this.sentNumber * this.price
        return priceExVat
    }

    calcVatFee() {
        let priceExVat = this.calcPriceExVat()
        let vatFee = priceExVat * this.vat
        return vatFee
    }
}

let roundNumber = (number, round) => {
    return Number(parseFloat(number).toFixed(2));
}

class PackArray {
    constructor(packArr) {
        this.packArr = packArr
        this.totalPriceExVat = 0
        this.totalPriceInVat = 0
        this.totalVatFee = 0
        this.calcPrice()
    }

    calcPrice() {
        this.totalPriceExVat = this.calcTotalPriceExVat()
        this.totalPriceInVat = this.calcTotalPriceInVat()
        this.totalVatFee = this.calcTotalVatFee()
    }


    checkNumberPack() {
        let validatePack = true
        let errMessage = ''
        let totalNumber = 0
        let lpackArr = this.packArr?.length
        for (let i = 0; i < lpackArr; i++) {
            let packObj = this.packArr[i]
            totalNumber += packObj?.sentNumber
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

        return [validatePack, errMessage]
    }

    calcTotalPriceInVat() {
        let totalPriceExVat = this.calcTotalPriceExVat()
        let totalVatFee = this.calcTotalVatFee()
        let totalPriceInVat = totalPriceExVat + totalVatFee
        totalPriceInVat = roundNumber(totalPriceInVat)
        return totalPriceInVat
    }

    calcTotalPriceExVat() {
        let totalPriceExVat = 0
        let lpackArr = this.packArr?.length
        for (let i = 0; i < lpackArr; i++) {
            let packObj = this.packArr[i]
            totalPriceExVat += packObj.calcPriceExVat()
        }
        totalPriceExVat = roundNumber(totalPriceExVat)
        return totalPriceExVat
    }

    calcTotalVatFee() {
        let totalVatFee = 0
        let lpackArr = this.packArr?.length
        for (let i = 0; i < lpackArr; i++) {
            let packObj = this.packArr[i]
            totalVatFee += packObj.calcVatFee()
        }
        totalVatFee = roundNumber(totalVatFee)
        return totalVatFee
    }
}

module.exports = {
    Pack, PackArray
}