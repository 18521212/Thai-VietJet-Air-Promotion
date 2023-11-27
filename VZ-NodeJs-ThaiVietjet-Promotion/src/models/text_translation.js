'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Text_Translation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Text_Translation.hasMany(models.Text_Input, { foreignKey: 'title', as: 'titleDataText_Input' })
            Text_Translation.hasMany(models.Text_Input, { foreignKey: 'placeHolder', as: 'placeHolderDataText_Input' })
            Text_Translation.hasMany(models.Dropdown, { foreignKey: 'title', as: 'titleDataDropdown' })

            Text_Translation.hasMany(models.Menu_Item, { foreignKey: 'text', as: 'textDataMenu_Item' })
            Text_Translation.hasMany(models.Sub_Menu, { foreignKey: 'text', as: 'textDataSub_Menu' })
        }
    };
    Text_Translation.init({
        valueTh: DataTypes.TEXT,
        valueEn: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Text_Translation',
    });
    return Text_Translation;
};