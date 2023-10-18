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
        //     'Packs',
        //     'widthMdScreen',
        //     {
        //         type: Sequelize.INTEGER,
        //         defaultValue: 12
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formSectionId',
        //     'formId',
        // )

        // add column
        queryInterface.addColumn(
            'Packs',
            'promotionId',
            {
                type: Sequelize.INTEGER,
                allowNull: false
                // defaultValue: null,
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        // await queryInterface.changeColumn(
        //     'Packs',
        //     'widthMdScreen',
        //     {
        //         type: Sequelize.INTEGER,
        //         defaultValue: 1
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formId',
        //     'formSectionId',
        // )

        queryInterface.removeColumn(
            'Packs',
            'promotionId',
        );
    }
};