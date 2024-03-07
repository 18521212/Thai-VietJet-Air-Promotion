const Redis = require('ioredis')
let _redis = new Redis()

// delete specific key Redis
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

// delete key in specific Sequelize model's hook
let addHookRefQueryRedis = (Model, _hooks, _refs) => {
    _hooks.forEach(_hook => {
        Model.addHook(_hook, async (item, options) => {
            _refs.forEach(_ref => {
                delKey(`model:${_ref}*`)
            })
        })
    })
}

module.exports = {
    delKey,
    addHookRefQueryRedis,
}