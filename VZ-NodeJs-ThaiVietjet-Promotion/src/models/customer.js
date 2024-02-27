'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Customer.hasMany(models.Order, {foreignKey: 'customerId'})
        }
        
    };
    Customer.init({
        middleGivenName: DataTypes.STRING,
        familyName: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        passengerMiddleGivenName: DataTypes.STRING,
        passengerFamilyName: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Customer',
    });
    return Customer;
};