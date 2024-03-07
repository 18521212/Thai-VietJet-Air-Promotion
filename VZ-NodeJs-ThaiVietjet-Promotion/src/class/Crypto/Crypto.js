var crypto = require('crypto');

// reference link: https://nodejs.org/api/crypto.html#crypto

class Crypto {
    constructor() {

    }

    sha512(string) {
        let encode = crypto.createHash('sha512').update(String(string)).digest('hex')
        return encode
    }
}

module.exports = {
    Crypto
}