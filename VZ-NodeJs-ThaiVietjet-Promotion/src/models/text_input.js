'use strict';
import { addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Text_Input extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Text_Input.belongsTo(models.Input, { foreignKey: 'inputId' })

            Text_Input.belongsTo(models.Text_Translation, { foreignKey: 'title', as: 'titleDataText_Input' })
            Text_Input.belongsTo(models.Text_Translation, { foreignKey: 'placeHolder', as: 'placeHolderDataText_Input' })
        }
    };
    Text_Input.init({
        title: DataTypes.INTEGER,
        placeHolder: DataTypes.INTEGER,
        typeText: DataTypes.STRING,
        inputId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Text_Input',
    });
    let _hooks = ['afterUpdate', 'afterDestroy']
    let _refs = ['Input']
    addHookRefQueryRedis(Text_Input, _hooks, _refs)
    return Text_Input;
};