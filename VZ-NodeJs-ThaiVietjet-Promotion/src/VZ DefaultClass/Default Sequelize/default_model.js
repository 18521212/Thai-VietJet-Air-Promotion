'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DefaultModel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // DefaultModel.belongsTo(models.Input, { foreignKey: 'inputId' })

            // DefaultModel.hasMany(models.Row_Dataset_Dropdown, { foreignKey: 'dropdownId', as: 'dataDropdown' })
        }
    };
    DefaultModel.init({
        property: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'DefaultModel',
    });
    return DefaultModel;
};