// logger implement specific log action
class Logger {
    constructor(_req = undefined, _res = undefined) {
        this.req = _req
        this.res = _res
    }

    replaceLargeString(_string = '', _length = 50) {
        if (typeof (_string) == 'string' && _string.length > _length) {
            return _string.substring(0, _length) + ' ...'
        }
        return _string
    }

    consoleLog() {
        let _l_req = this.consoleLogReq()
        let _l_res = this.consoleLogRes()
        console.log('Log at: ', new Date())
        console.log(_l_req)
        console.log(_l_res)
    }

    consoleLogReq() {
        let _csl_l_req = ''
        let _fullUrl = this.req.protocol + '://' + this.req.get('host') + this.req.originalUrl
        let _url = 'url: ' + _fullUrl
        let _method = 'method: ' + this.req.method
        let _query = 'query: ' + JSON.stringify(this.req.query)
        let _params = 'param: ' + JSON.stringify(this.req.params)
        let _body = 'body: ' + JSON.stringify(this.req.body)
        _csl_l_req = 'req: ' + _url + ' ' + _method + ' ' + _query + ' ' + _params + ' ' + _body
        return _csl_l_req
    }

    consoleLogRes() {
        let _csl_l_res = ''
        let _replacer = (key, value) => {
            return this.replaceLargeString(value, 50)
        }
        _csl_l_res = 'res: ' + JSON.stringify(this.res.data,
            _replacer
            , 2)
        return _csl_l_res
    }
}

module.exports = {
    Logger
}