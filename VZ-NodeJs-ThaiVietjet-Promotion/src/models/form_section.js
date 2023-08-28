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
            Form_Section.belongsTo(models.Form, { foreignKey: 'customer_form_id' })
        }
    };
    Form_Section.init({
        title: DataTypes.STRING,
        instruct: DataTypes.STRING,
        customer_form_id: DataTypes.INTEGER,
        frame_card_id: DataTypes.INTEGER,
        breakdownId: DataTypes.INTEGER,
        checkboxId: DataTypes.INTEGER,
        button_submit_id: DataTypes.INTEGER,
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Form_Section',
    });
    return Form_Section;
};