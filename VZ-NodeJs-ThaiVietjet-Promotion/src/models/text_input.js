'use strict';
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
        }
    };
    Text_Input.init({
        title: DataTypes.STRING,
        placeHolder: DataTypes.STRING,
        typeText: DataTypes.STRING,
        inputId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Text_Input',
    });
    return Text_Input;
};