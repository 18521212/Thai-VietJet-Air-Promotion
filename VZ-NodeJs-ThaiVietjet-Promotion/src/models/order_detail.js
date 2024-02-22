'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order_Detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // TODO: belongsTo Order
        }
    };
    Order_Detail.init({
       orderId: DataTypes.UUID,
       productId: DataTypes.INTEGER,
       quantity: DataTypes.INTEGER,
       unitPrice: DataTypes.FLOAT,
       vat: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Order_Detail',
    });
    return Order_Detail;
};