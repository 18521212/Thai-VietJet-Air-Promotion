'use strict';
import { delKey, addHookRefQueryRedis } from '../utils';
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
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['Banner']
    addHookRefQueryRedis(Image_Banner, _hooks, _refs)
    return Image_Banner;
};