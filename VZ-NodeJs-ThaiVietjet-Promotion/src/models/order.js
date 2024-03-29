'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Order.belongsTo(models.Customer, { foreignKey: 'customerId' })
            Order.hasMany(models.Order_Detail, { foreignKey: 'orderId' })
        }
    };
    Order.init({
        // add definition id property if use UUID type
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        customerId: DataTypes.INTEGER,
        totalPriceInVat: DataTypes.FLOAT,
        totalVatFee: DataTypes.FLOAT,
        status: DataTypes.STRING,
        payRef: DataTypes.STRING,
        emailStatus: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
        hooks: {
            afterCreate: (item, options) => {

            },
            afterUpdate: (item, options) => {

            }
        },
    });
    return Order;
};