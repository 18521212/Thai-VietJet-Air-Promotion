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

        await queryInterface.changeColumn(
            'Text_Translations',
            'valueEn',
            {
                type: Sequelize.TEXT,
                allowNull: false
            }
        )

        await queryInterface.changeColumn(
            'Text_Translations',
            'valueTh',
            {
                type: Sequelize.TEXT,
            }
        )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formSectionId',
        //     'formId',
        // )

        // add column
        // queryInterface.addColumn(
        //     'Footers',
        //     'term_and_condition',
        //     {
        //         type: Sequelize.INTEGER
        //     }
        // );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn(
            'Text_Translations',
            'valueEn',
            {
                type: Sequelize.STRING,
                allowNull: false
            }
        )

        await queryInterface.changeColumn(
            'Text_Translations',
            'valueTh',
            {
                type: Sequelize.STRING,
            }
        )

        // await queryInterface.renameColumn(
        //     'Campaigns',
        //     'formId',
        //     'formSectionId',
        // )

        // queryInterface.removeColumn(
        //     'Footers',
        //     'term_and_condition',
        // );
    }
};