'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // await queryInterface.changeColumn(
        //     'Menus',
        //     'name',
        //     {
        //         type: Sequelize.STRING,
        //         allowNull: false
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Menus',
        //     'headerId',
        //     'name',
        // )

        // add column
        queryInterface.addColumn(
            'Headers',
            'menuId',
            {
                type: Sequelize.INTEGER,
                // defaultValue: null
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        // await queryInterface.changeColumn(
        //     'Menus',
        //     'name',
        //     {
        //         type: Sequelize.INTEGER,
        //         allowNull: false
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Menus',
        //     'name',
        //     'headerId',
        // )

        queryInterface.removeColumn(
            'Headers',
            'menuId',
        );
    }
};