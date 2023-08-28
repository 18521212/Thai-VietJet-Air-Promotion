'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn(
            'Text_Inputs',
            'inputId',
            {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        )
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn(
            'Text_Inputs',
            'inputId',
            {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        )
    }
};