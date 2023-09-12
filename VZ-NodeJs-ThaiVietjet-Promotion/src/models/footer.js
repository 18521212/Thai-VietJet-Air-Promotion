'use strict';
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
            // Footer.belongsTo(models.Input, { foreignKey: 'inputId' })

            Footer.hasOne(models.Footer_Text, { foreignKey: 'footerId', as: 'footer_text' })
        }
    };
    Footer.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Footer',
    });
    return Footer;
};