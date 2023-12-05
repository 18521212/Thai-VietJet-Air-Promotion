'use strict';
import { association } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Markdown.hasMany(models.Footer, { foreignKey: 'term_and_condition', as: association.MARKDOWN_TERM_AND_CONDITION, onDelete: 'restrict' })
            Markdown.hasMany(models.Footer, { foreignKey: 'how_to_use', as: association.MARKDOWN_HOW_TO_USE, onDelete: 'restrict' })
            Markdown.hasMany(models.Pack, { foreignKey: 'markdownId', as: association.MARKDOWN_PACK })
        }
    };
    Markdown.init({
        titleEn: DataTypes.TEXT,
        titleTh: DataTypes.TEXT,
        contentEn: DataTypes.TEXT,
        contentTh: DataTypes.TEXT,
        markdownEn: DataTypes.TEXT,
        markdownTh: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};