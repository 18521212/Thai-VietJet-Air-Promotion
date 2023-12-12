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
            // Order_Detail.hasMany(models.Image_Banner, { foreignKey: 'bannerId', as: 'image_banner' })
        }
    };
    Order_Detail.init({
       orderId: DataTypes.INTEGER,
       productId: DataTypes.INTEGER,
       number: DataTypes.INTEGER,
       unitPrice: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Order_Detail',
    });
    return Order_Detail;
};