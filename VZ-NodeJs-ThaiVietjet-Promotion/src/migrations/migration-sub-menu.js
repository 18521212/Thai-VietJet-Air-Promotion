'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Sub_Menus', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            menuParentId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            order: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            text: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            link: {
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

        //add column type to table banner
        // await queryInterface.addColumn(
        //     'Sub_Menu',
        //     'type',
        //     { type: Sequelize.STRING }
        // );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Sub_Menus');
    }
};