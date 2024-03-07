// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'
import { transporter as _transporter, emailContent } from "../../config/email";
const transporter = nodemailer.createTransport(_transporter);
import { getOrder, updateEmailStatus } from '../../services/paymentService'

// reference link: https://nodemailer.com/smtp/

class Email {
    constructor(receiver) {
        this.receiver = receiver
    }

    async sendEmail(_ref, _status) {
        return new Promise(async (resolve, reject) => {
            let _get_o = await getOrder({ ref: _ref })
            if (_get_o.data.emailStatus == 'sent') {
               return resolve(true)
            } else {
                let _emailContent = emailContent(this.receiver, _ref, _status)
                const info = transporter.sendMail(_emailContent, async (err, info) => {
                    if (err) {
                        return resolve(false)
                    } else {
                        await updateEmailStatus({ ref: _ref })
                        return resolve(true)
                    }
                });
            }
        })
    }
}

module.exports = {
    Email
}