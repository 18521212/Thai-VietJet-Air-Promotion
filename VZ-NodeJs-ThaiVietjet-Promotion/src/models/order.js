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
            // Order.hasMany(models.Image_Banner, { foreignKey: 'bannerId', as: 'image_banner' })
        }
    };
    Order.init({
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
        payRef: DataTypes.STRING
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