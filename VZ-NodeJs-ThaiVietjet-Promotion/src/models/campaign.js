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
            // TODO: Testing create with association with no id exist RESULTED doesnt effect
            Campaign.belongsTo(models.Promotion, { foreignKey: 'promotionId' })
            Campaign.belongsTo(models.Header, { foreignKey: 'headerId' })
            Campaign.belongsTo(models.Banner, { foreignKey: 'bannerId' })
            Campaign.belongsTo(models.Content_Body, { foreignKey: 'bodyId' })
            Campaign.belongsTo(models.Form, { foreignKey: 'formId' })
            Campaign.belongsTo(models.Footer, { foreignKey: 'footerId' })
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