'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Form_Details', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            formId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            inputId: {
                type: Sequelize.INTEGER,
            },
            order: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            widthMdScreen: {
                type: Sequelize.INTEGER,
                defaultValue: 12
            },
            required: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            },
            nameApi: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Form_Details');
    }
};