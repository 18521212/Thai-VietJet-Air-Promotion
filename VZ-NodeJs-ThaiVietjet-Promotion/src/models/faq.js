'use strict';
import { association, addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FAQ extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            FAQ.hasMany(models.FAQ_Question, { foreignKey: 'FAQId', as: association.FAQ_FAQID })
            FAQ.hasMany(models.Footer, { foreignKey: 'faq', as: association.FAQ_FOOTER })
        }
    };
    FAQ.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FAQ',
    });
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['Footer']
    addHookRefQueryRedis(FAQ, _hooks, _refs)
    return FAQ;
};