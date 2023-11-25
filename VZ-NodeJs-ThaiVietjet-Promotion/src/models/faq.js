'use strict';
import { association } from '../utils'
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
        }
    };
    FAQ.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'FAQ',
    });
    return FAQ;
};