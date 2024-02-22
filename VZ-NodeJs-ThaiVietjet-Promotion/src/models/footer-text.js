'use strict';
import { addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Footer_Text extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Footer_Text.belongsTo(models.Footer, { foreignKey: 'footerId', as: 'footer_text' })
        }
    };
    Footer_Text.init({
        title: DataTypes.STRING,
        link: DataTypes.TEXT,
        footerId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Footer_Text',
        // TODO: optimize reset cache redis
        // hooks: {
        //     afterCreate: (item, options) => {
        //         delKey(`model:Footer:all*`)
        //         delKey(`model:Footer:${item.footerId}`)
        //     },
        //     afterUpdate: (item, options) => {
        //         delKey(`model:Footer:all*`)
        //         delKey(`model:Footer:${item.footerId}`)
        //     },
        //     afterDestroy: (item, options) => {
        //         delKey(`model:Footer:all*`)
        //         delKey(`model:Footer:${item.footerId}`)
        //     }
        // }
    });
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['Footer']
    addHookRefQueryRedis(Footer_Text, _hooks, _refs)
    return Footer_Text;
};