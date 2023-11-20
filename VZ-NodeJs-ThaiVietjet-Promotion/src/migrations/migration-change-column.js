'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // await queryInterface.changeColumn(
        //     'Headers',
        //     'imageLogo',
        //     {
        //         type: Sequelize.BLOB('long'),
        //         allowNull: false
        //     }
        // )

        // await queryInterface.changeColumn(
        //     'Campaigns',
        //     'promotionId',
        //     {
        //         type: Sequelize.INTEGER,
        //         allowNull: true
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formSectionId',
        //     'formId',
        // )

        // add column
        // queryInterface.addColumn(
        //     'Campaigns',
        //     'promotionId',
        //     {
        //         type: Sequelize.INTEGER,
        //         allowNull: false
        //         // defaultValue: null,
        //     }
        // );
    },
    down: async (queryInterface, Sequelize) => {
        // await queryInterface.changeColumn(
        //     'Campaigns',
        //     'promotionId',
        //     {
        //         type: Sequelize.INTEGER,
        //         allowNull: false
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formId',
        //     'formSectionId',
        // )

        // queryInterface.removeColumn(
        //     'Campaigns',
        //     'promotionId',
        // );
    }
};