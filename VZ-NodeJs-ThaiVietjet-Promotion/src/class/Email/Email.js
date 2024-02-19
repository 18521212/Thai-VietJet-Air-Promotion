const nodemailer = require("nodemailer");
import { transporter as _transporter, emailContent } from "../../config/email";
const transporter = nodemailer.createTransport(_transporter);

class Email {
    constructor(receiver) {
        this.receiver = receiver
    }

    async sendEmail(_ref, _status) {
        let _emailContent = emailContent(this.receiver, _ref, _status)
        const info = await transporter.sendMail(_emailContent);
        console.log('email infor:', info)
    }
}

module.exports = {
    Email
}