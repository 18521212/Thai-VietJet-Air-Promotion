class Pack {
    constructor(pack) {
        this.id = pack?.id
        this.name = pack?.name
        this.price = pack?.price
        this.maxQuantity = pack?.maxQuantity
        this.vat = pack?.vat
        this.currency = pack?.currency
        this.sentQuantity = 0
        this.totalPriceInVat = 0
    }

    calcPrice() {
        this.totalPriceInVat = this.calcPriceInVat()
    }

    setSentQuantity(sentQuantity) {
        if (this.checkQuantityPack(sentQuantity)[0]) {
            this.sentQuantity = sentQuantity
            this.calcPrice()
        }
    }

    checkQuantityPack(quantityPack = this.sentQuantity) {
        let valid = true, errMessage = ''
        if (quantityPack < 0) {
            valid = false
            errMessage = 'invalid number pack'
        } else if (quantityPack > this.maxQuantity) {
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
        let priceExVat = this.sentQuantity * this.price
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

    checkQuantityPack() {
        let validatePack = true
        let errMessage = ''
        let totalQuantity = 0
        let lpackArr = this.packArr?.length
        for (let i = 0; i < lpackArr; i++) {
            let packObj = this.packArr[i]
            totalQuantity += packObj?.sentQuantity
            let validatePackNum = packObj.checkQuantityPack()
            if (validatePackNum[0] === false) {
                validatePack = false
                errMessage = validatePackNum[1]
                break
            }
        }
        if (totalQuantity <= 0) {
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