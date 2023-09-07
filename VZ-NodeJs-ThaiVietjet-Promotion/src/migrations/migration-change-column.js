'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // await queryInterface.changeColumn(
        //     'Menu_Items',
        //     'title',
        //     {
        //         type: Sequelize.INTEGER,
        //         allowNull: false
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Form_Details',
        //     'widthXLScreen',
        //     'widthMdScreen',
        // )

        // add column
        queryInterface.addColumn(
            'Menu_Items',
            'highLight',
            {
                type: Sequelize.STRING,
                defaultValue: null
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        // await queryInterface.changeColumn(
        //     'Menu_Items',
        //     'title',
        //     {
        //         type: Sequelize.STRING,
        //         allowNull: false
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Form_Details',
        //     'widthMdScreen',
        //     'widthXLScreen',
        // )

        queryInterface.removeColumn(
            'Menu_Items',
            'highLight',
        );
    }
};