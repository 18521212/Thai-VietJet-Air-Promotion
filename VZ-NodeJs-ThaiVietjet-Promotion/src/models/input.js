'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Input extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Input.hasMany(models.Form_Detail, { foreignKey: 'inputId' })

            Input.hasOne(models.Text_Input, { foreignKey: 'inputId' })
            Input.hasOne(models.Dropdown, { foreignKey: 'inputId' })
        }
    };
    Input.init({
        typeInput: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Input',
    });
    return Input;
};