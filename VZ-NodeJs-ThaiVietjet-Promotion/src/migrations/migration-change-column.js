'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // type: Sequelize.BLOB('long'),

        // await queryInterface.changeColumn(
        //     'Text_Translations',
        //     'valueEn',
        //     {
        //         type: Sequelize.TEXT,
        //         allowNull: false
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formSectionId',
        //     'formId',
        // )

        // add column
        // queryInterface.addColumn(
        //     'Form_Details',
        //     'nameApi',
        //     {
        //         type: Sequelize.STRING,
        //         allowNull: false
        //     }
        // );

        // queryInterface.removeColumn(
        //     'Packs',
        //     'numberRedeem',
        // );
    },
    down: async (queryInterface, Sequelize) => {
        // await queryInterface.changeColumn(
        //     'Text_Translations',
        //     'valueEn',
        //     {
        //         type: Sequelize.STRING,
        //         allowNull: false
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formId',
        //     'formSectionId',
        // )

        // queryInterface.removeColumn(
        //     'Form_Details',
        //     'nameApi',
        // );

        // add column
        // queryInterface.addColumn(
        //     'Packs',
        //     'numberRedeem',
        //     {
        //         type: Sequelize.INTEGER
        //     }
        // );
    }
};