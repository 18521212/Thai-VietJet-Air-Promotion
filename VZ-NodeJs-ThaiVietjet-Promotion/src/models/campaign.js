'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Campaign extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Campaign.belongsTo(models.Input, { foreignKey: 'inputId' })
            // belongsTo
            // TODO: Testing create with association with no id exist DOING
        }
    };
    Campaign.init({
        name: DataTypes.STRING,
        promotionId: DataTypes.INTEGER,
        headerId: DataTypes.INTEGER,
        bannerId: DataTypes.INTEGER,
        bodyId: DataTypes.INTEGER,
        formId: DataTypes.INTEGER,
        footerId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Campaign',
    });
    return Campaign;
};