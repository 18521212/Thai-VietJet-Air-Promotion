const transporter = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD
    },
}

const emailContent = (receiver, _ref, _status) => {
    let emailContent = {
        from: `"Thai Vietjet Promotion" <${process.env.EMAIL_APP}>`,
        to: receiver,
        subject: "Checking your order status", // Subject line
        html: emailPaymentStatus(_ref, _status), // html body,

        dsn: {
            id: 'some random message specific id',
            return: 'headers',
            notify: 'success',
            recipient: 'tranxuannhon44@gmail.com'
        }
    }
    return emailContent
}

let emailPaymentStatus = (_ref, _status) => `
    Thai Vietjet Promotion

    <br/>
    <br/>
    Hello customer,
    <br/>
    Your Order Id: ${_ref}
    <br/>
    Order Status: ${_status}
`

module.exports = {
    transporter, emailContent
}