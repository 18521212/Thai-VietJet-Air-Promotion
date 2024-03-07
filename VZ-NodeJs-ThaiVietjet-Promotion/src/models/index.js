'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

import { delKey } from '../utils';

// redis config
// reference link: https://github.com/sequelize-transparent-cache/sequelize-transparent-cache

const Redis = require('ioredis')
let _redis = new Redis()

const RedisAdaptor = require('sequelize-transparent-cache-ioredis')
const _redisAdaptor = new RedisAdaptor({
    client: _redis,
    namespace: 'model',
    lifetime: 60 * 60
})

const sequelizeCache = require('sequelize-transparent-cache')
const { withCache } = sequelizeCache(_redisAdaptor)
// --< redis config

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(async modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
        // config redis model
        db[modelName] = withCache(db[modelName])
        // --< config redis model
        // config hook update cache
        let arrHook = ['afterCreate', 'afterUpdate', 'afterSave', 'afterDestroy', 'afterBulkCreate', 'afterBulkUpdate', 'afterBulkDestroy']
        arrHook.forEach(async hookName => {
            await db[modelName].addHook(hookName, async (item, options) => {
                let stream = _redis.scanStream({
                    match: `model:${modelName}:all*`
                });
                stream.on('data', function (keys) {
                    // `keys` is an array of strings representing key names
                    if (keys.length) {
                        var pipeline = _redis.pipeline();
                        keys.forEach(function (key) {
                            pipeline.del(key);
                        });
                        pipeline.exec();
                    }
                });
            });
        })
        // --< config hook update cache
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
