'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Form_Section extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Form_Section.hasOne(models.Menu, { foreignKey: 'headerId' })
        }
    };
    Form_Section.init({
        title: DataTypes.STRING,
        instruct: DataTypes.STRING,
        customer_form_id: DataTypes.INTEGER,
        frame_card_id: DataTypes.INTEGER,
        break_down_id: DataTypes.INTEGER,
        checkbox_id: DataTypes.INTEGER,
        button_submit_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Form_Section',
    });
    return Form_Section;
};