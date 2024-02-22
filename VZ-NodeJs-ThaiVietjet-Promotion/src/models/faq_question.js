'use strict';
import { association, addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FAQ_Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            FAQ_Question.belongsTo(models.FAQ, { foreignKey: 'FAQId', as: association.FAQ_FAQID })
        }
    };
    FAQ_Question.init({
        FAQId: DataTypes.INTEGER,
        question: DataTypes.TEXT,
        answer: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'FAQ_Question',
    });
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['FAQ']
    addHookRefQueryRedis(FAQ_Question, _hooks, _refs)
    return FAQ_Question;
};