'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pack extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Pack.belongsTo(models.Promotion, { foreignKey: 'promotionId', as: 'pack' })
        }
    };
    Pack.init({
        name: DataTypes.STRING,
        maxNumber: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        currency: DataTypes.STRING,
        numberRedeem: DataTypes.INTEGER,
        promotionId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Pack',
    });
    return Pack;
};