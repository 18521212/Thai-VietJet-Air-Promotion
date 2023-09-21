'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Menu_Items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            menuId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            text: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            link: {
                type: Sequelize.STRING
            },
            highlight: {
                type: Sequelize.STRING,
                defaultValue: null
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
        //     'Menu_Item',
        //     'type',
        //     { type: Sequelize.STRING }
        // );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Menu_Items');
    }
};