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
        //     'Headers',
        //     'imageBackground',
        //     {
        //         type: Sequelize.BLOB('long'),
        //         allowNull: false
        //     }
        // )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formSectionId',
        //     'formId',
        // )

        // add column
        queryInterface.addColumn(
            'Content_Bodies',
            'markdownEn',
            {
                type: Sequelize.TEXT,
                // defaultValue: null,
            }
        );
        queryInterface.addColumn(
            'Content_Bodies',
            'markdownTh',
            {
                type: Sequelize.TEXT,
                // defaultValue: null,
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
        //     'Campaigns',
        //     'formId',
        //     'formSectionId',
        // )

        queryInterface.removeColumn(
            'Content_Bodies',
            'markdownEn',
        );
        queryInterface.removeColumn(
            'Content_Bodies',
            'markdownTh',
        );
    }
};