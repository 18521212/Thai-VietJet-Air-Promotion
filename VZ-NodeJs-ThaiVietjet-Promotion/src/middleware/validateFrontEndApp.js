let sha512 = (string) => {
    var crypto = require('crypto');
    let encode = crypto.createHash('sha512').update(String(string)).digest('hex')
    return encode
}

let validateFrontEndApp = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.status(200).send('ok')
    }
    if (req.headers['x-request-key'] !== process.env.REQUEST_KEY) {
        res.data = 'denied'
        return res.status(403).send(res.data)
    }
    next();
}

module.exports = {
    validateFrontEndApp,
}