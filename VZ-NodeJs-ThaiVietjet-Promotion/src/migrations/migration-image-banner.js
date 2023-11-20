'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Image_Banners', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bannerId:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            image: {
                type: Sequelize.BLOB('long'),
                allowNull: false
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'desktop'
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
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Image_Banners');
    }
};