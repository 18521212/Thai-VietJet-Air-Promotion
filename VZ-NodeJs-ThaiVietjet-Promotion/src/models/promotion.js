'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Promotion extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Promotion.hasMany(models.Pack, { foreignKey: 'promotionId', as: 'pack' })
            Promotion.hasMany(models.Campaign, {foreignKey: 'promotionId'})
        }
    };
    Promotion.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Promotion',
    });
    return Promotion;
};