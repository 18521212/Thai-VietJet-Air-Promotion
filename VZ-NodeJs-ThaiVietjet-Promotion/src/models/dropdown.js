'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Dropdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Dropdown.belongsTo(models.Input, { foreignKey: 'inputId' })

            Dropdown.hasMany(models.Row_Dataset_Dropdown, { foreignKey: 'dropdownId', as: 'dataDropdown' })
        }
    };
    Dropdown.init({
        title: DataTypes.STRING,
        inputId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Dropdown',
    });
    return Dropdown;
};