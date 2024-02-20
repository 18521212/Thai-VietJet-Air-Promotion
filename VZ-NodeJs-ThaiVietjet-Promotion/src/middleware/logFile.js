const fs = require('node:fs');

let logFile = (req, res, next) => {
    var appRoot = require('app-root-path');
    const { inspect } = require('node:util');
    let url = appRoot + '/log/generalLog.txt'
    let content = ''
    let reqText = `req: \n \treq.params:${inspect(req.params)}\n \treq.query:${inspect(req.query)} \n \treq.body:${inspect(req.body)}`
    // let resText = `res: \n \tres.data:${JSON.stringify(res?.data, null, '\t')}`
    let resText = `res: \n \terrCode:${res.data.errCode} \n\terrMessage:${res.data.errMessage} \n\tdata: ${res.data.data}`
    try {
        // content = `log at ${new Date()} \n${reqText} \n${resText}\n`
        // fs.appendFileSync(url, content);
        content = `log at ${new Date()} \n${reqText} \n${resText}\n`
    console.log("content", content)
    } catch (err) {
        // console.error(err);
        content = `error log: \n${err}\n`
        console.log(content)
        // fs.appendFileSync(url, content);
    }
}

module.exports = {
    logFile,
}