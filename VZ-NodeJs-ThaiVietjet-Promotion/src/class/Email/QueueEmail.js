import { Email } from '../Email/Email'

const Queue = require('bull');

// reference link:
//  queue: https://github.com/OptimalBits/bull
//  retry failing job: https://docs.bullmq.io/guide/retrying-failing-jobs

class QueueEmail {
    constructor() {
        this.queueEmail = new Queue('email')

        this.queueEmail.process(async (job, done) => {
            let { receiver, ref, status } = job.data
            let email = new Email(receiver)
            let _rsl_em = await email.sendEmail(ref, status)
            if(_rsl_em){
                done()
            }else{
                done(new Error())
            }
        })
    }

    async addEmailToQueue(_data) {
        let _options = {
            // attempts: Number.MAX_SAFE_INTEGER,
            // TODO: update email status: 'error'
            attempts: 3,
        }
        await this.queueEmail.add(_data, _options)
    }
}

module.exports = {
    QueueEmail
}