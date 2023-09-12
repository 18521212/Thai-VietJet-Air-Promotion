'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Campaigns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            headerId: {
                type: Sequelize.INTEGER
            },
            bannerId: {
                type: Sequelize.INTEGER
            },
            bodyId: {
                type: Sequelize.INTEGER
            },
            formSectionId: {
                type: Sequelize.INTEGER
            },
            footerId: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Campaigns');
    }
};