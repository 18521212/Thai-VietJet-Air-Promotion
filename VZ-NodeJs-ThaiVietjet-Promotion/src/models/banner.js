'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Banner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Banner.hasMany(models.Image_Banner, { foreignKey: 'bannerId', as: 'image_banner' })
        }
    };
    Banner.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Banner',
    });
    return Banner;
};