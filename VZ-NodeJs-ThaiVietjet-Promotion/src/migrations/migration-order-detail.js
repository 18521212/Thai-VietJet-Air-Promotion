'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Order_Details', {
            id: {
                allowNull: false,
                // defaultValue: Sequelize.UUIDV4,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            orderId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                min: 0
            },
            unitPrice: {
                type: Sequelize.FLOAT,
                allowNull: false,
                min: 0
            },
            vat: {
                type: Sequelize.FLOAT,
                allowNull: false,
                defaultValue: 0,
                min: 0
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
        await queryInterface.dropTable('Order_Details');
    }
};