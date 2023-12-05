'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Packs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            promotionId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            maxNumber: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            maxNumber: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            vat: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
                allowNull: false,
            },
            markdownId: {
                type: Sequelize.INTEGER,
            },
            currency: {
                type: Sequelize.STRING,
                defaultValue: 'THB'
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
        await queryInterface.dropTable('Packs');
    }
};