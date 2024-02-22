'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Content_Body extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // TODO: ? merge with markdown table
        }
    };
    Content_Body.init({
        name: DataTypes.STRING,
        contentEn: DataTypes.TEXT,
        contentTh: DataTypes.TEXT,
        markdownEn: DataTypes.TEXT,
        markdownTh: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Content_Body',
    });
    return Content_Body;
};