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

        }
    };
    Pack.init({
        name: DataTypes.STRING,
        maxNumber: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        currency: DataTypes.STRING,
        numberRedeem: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Pack',
    });
    return Pack;
};