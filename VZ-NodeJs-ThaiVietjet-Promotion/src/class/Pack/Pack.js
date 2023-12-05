class Pack {
    constructor(pack) {
        this.price = pack?.price
        this.maxNumber = pack?.maxNumber
        this.vat = pack?.vat
        this.currency = pack?.currency
        this.sentNumber = 0
    }

    setSentNumber(sentNumber) {
        if (this.checkNumberPack(sentNumber)[0]) {
            this.sentNumber = sentNumber
        }
    }

    checkNumberPack(numberPack=this.sentNumber) {
        let valid = true, errMessage = ''
        if (numberPack <= 0) {
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

module.exports = {
    Pack
}