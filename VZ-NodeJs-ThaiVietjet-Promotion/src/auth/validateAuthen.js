const CognitoExpress = require('cognito-express')
import { resolveObj } from '../utils'

// Setup CognitoExpress
// reference link: https://www.npmjs.com/package/cognito-express

const cognitoExpress = new CognitoExpress({
    region: process.env.AWS_DEFAULT_REGION,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    tokenExpiration: 3600000 // 1 hour token expire time
})

const validateAuth = async (req, res, next) => {
    try {
        let accessToken = req.body.accessToken
        let accessTokenFromClient = accessToken
        await cognitoExpress.validate(accessTokenFromClient)
        next()
    } catch (e) {
        console.log(e)
        return res.status(200).json(resolveObj.UNAUTHEN_ERROR)
    }
}

module.exports = {
    validateAuth
}