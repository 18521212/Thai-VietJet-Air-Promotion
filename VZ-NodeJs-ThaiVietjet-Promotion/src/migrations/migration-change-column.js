'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn(
            'Headers',
            'imageLogo',
            {
                type: Sequelize.BLOB('long'),
                allowNull: false
            }
        )

        await queryInterface.changeColumn(
            'Headers',
            'imageBackground',
            {
                type: Sequelize.BLOB('long'),
                allowNull: false
            }
        )

        // await queryInterface.renameColumn(
        //     'Menu_Items',
        //     'highLight',
        //     'highlight',
        // )

        // add column
        // queryInterface.addColumn(
        //     'Headers',
        //     'menuId',
        //     {
        //         type: Sequelize.INTEGER,
        //         // defaultValue: null
        //     }
        // );
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
        //     'Menu_Items',
        //     'highlight',
        //     'highLight',
        // )

        // queryInterface.removeColumn(
        //     'Headers',
        //     'menuId',
        // );
    }
};