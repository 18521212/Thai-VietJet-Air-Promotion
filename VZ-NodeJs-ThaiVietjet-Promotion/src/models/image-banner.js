'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image_Banner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Image_Banner.belongsTo(models.Banner, { foreignKey: 'bannerId', as: 'image_banner' })
        }
    };
    Image_Banner.init({
        bannerId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Image_Banner',
    });
    return Image_Banner;
};