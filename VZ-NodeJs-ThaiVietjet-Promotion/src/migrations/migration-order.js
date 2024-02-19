'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                type: Sequelize.UUID
            },
            customerId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            totalPriceInVat: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            totalVatFee: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
                // isIn: [['-1', '0']]
            },
            payRef: {
                type: Sequelize.STRING,
            },
            emailStatus: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('Orders');
    }
};