'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Content_Bodies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentEn: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            name:{
                type: Sequelize.STRING,
                allowNull: false
            },
            contentTh: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('Content_Bodies');
    }
};