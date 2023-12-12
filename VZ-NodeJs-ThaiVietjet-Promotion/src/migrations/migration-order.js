'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customerId: {
                type: Sequelize.INTEGER,
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