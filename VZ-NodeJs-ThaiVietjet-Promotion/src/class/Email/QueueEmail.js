import { Email } from '../Email/Email'

const Queue = require('bull');

class QueueEmail {
    constructor() {
        this.queueEmail = new Queue('email')

        this.queueEmail.process(async (job, done) => {
            console.log('data job')
            let { receiver, ref, status } = job.data
            let email = new Email(receiver)
            await email.sendEmail(ref, status)
            done()
        })
    }

    async addEmailToQueue(_data) {
        await this.queueEmail.add(_data)
    }
}

module.exports = {
    QueueEmail
}