'use strict';
import { association, addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Footer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Footer.hasMany(models.Footer_Text, { foreignKey: 'footerId', as: 'footer_text' })
            Footer.belongsTo(models.Markdown, { foreignKey: 'term_and_condition', as: association.MARKDOWN_TERM_AND_CONDITION })
            Footer.belongsTo(models.Markdown, { foreignKey: 'how_to_use', as: association.MARKDOWN_HOW_TO_USE })
            Footer.belongsTo(models.FAQ, { foreignKey: 'faq', as: association.FAQ_FOOTER })
        }
    };
    Footer.init({
        name: DataTypes.STRING,
        term_and_condition: DataTypes.INTEGER,
        faq: DataTypes.INTEGER,
        how_to_use: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Footer',
    });
    return Footer;
};