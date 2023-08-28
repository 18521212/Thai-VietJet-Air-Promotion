'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Form_Sections', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
            },
            instruct: {
                type: Sequelize.STRING,
            },
            customer_form_id: {
                type: Sequelize.INTEGER
            },
            frame_card_id: {
                type: Sequelize.INTEGER
            },
            breakdownId: {
                type: Sequelize.INTEGER
            },
            checkboxId: {
                type: Sequelize.INTEGER
            },
            button_submit_id: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Form_Sections');
    }
};