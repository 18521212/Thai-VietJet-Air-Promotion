'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            titleEn: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            titleTh: {
                type: Sequelize.TEXT,
            },
            contentEn: {
                type: Sequelize.TEXT
            },
            contentTh: {
                type: Sequelize.TEXT
            },
            markdownEn: {
                type: Sequelize.TEXT,
            },
            markdownTh: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('Markdowns');
    }
};