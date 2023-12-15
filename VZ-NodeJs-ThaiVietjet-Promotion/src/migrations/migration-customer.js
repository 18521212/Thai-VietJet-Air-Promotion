'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Customers', {
            id: {
                allowNull: false,
                // defaultValue: Sequelize.UUIDV4,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            middleGivenName: {
                type: Sequelize.STRING,
            },
            familyName: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            passengerMiddleGivenName: {
                type: Sequelize.STRING,
            },
            passengerFamilyName: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Customers');
    }
};