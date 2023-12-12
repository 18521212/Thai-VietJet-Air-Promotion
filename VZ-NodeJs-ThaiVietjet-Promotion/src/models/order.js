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
        customerId: DataTypes.INTEGER,
        totalPriceInVat: DataTypes.FLOAT,
        totalVatFee: DataTypes.FLOAT,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Order',
        hooks: {
            beforeCreate: (item, options) => {
                if (item.id === 1) {
                    item.id = 2
                }
            },
        },
    });
    return Order;
};