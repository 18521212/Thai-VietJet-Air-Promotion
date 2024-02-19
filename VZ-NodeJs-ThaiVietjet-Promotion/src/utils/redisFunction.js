const Redis = require('ioredis')
let _redis = new Redis()

let delKey = (_key_pattern) => {
    let stream = _redis.scanStream({
        match: _key_pattern // example: `model:${modelName}:all*`
    });
    stream.on('data', function (keys) {
        if (keys.length) {
            var pipeline = _redis.pipeline();
            keys.forEach(function (key) {
                pipeline.del(key);
            });
            pipeline.exec();
        }
    });
}

module.exports = {
    delKey
}