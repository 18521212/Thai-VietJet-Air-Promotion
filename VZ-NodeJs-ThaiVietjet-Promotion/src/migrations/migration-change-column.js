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
        //     'Order_Details',
        //     'number',
        //     'quantity',
        // )

        // add column
        // queryInterface.addColumn(
        //     'Orders',
        //     'emailStatus',
        //     {
        //         type: Sequelize.STRING,
        //         allowNull: false,
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
        //     'Order_Details',
        //     'quantity',
        //     'number',
        // )

        // queryInterface.removeColumn(
        //     'Orders',
        //     'emailStatus',
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