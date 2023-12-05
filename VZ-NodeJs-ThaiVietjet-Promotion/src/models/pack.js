'use strict';
import { association } from '../utils'
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
            Pack.belongsTo(models.Promotion, { foreignKey: 'promotionId', as: 'pack' })
            Pack.belongsTo(models.Markdown, { foreignKey: 'markdownId', as: association.MARKDOWN_PACK })
        }
    };
    Pack.init({
        name: DataTypes.STRING,
        maxNumber: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        vat: DataTypes.FLOAT,
        currency: DataTypes.STRING,
        promotionId: DataTypes.INTEGER,
        markdownId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Pack',
    });
    return Pack;
};