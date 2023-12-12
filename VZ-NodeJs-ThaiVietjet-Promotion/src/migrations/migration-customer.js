'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Customers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            middleName: {
                type: Sequelize.STRING,
            },
            familyName: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            phone: {
                type: Sequelize.STRING,
            },
            passengerMiddleName: {
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