'use strict';

import { association, delKey } from '../utils'

let delKey_Redis = async (item) => {
    // markdown table
    let _has_ft = await item.hasFooter()
    if (_has_ft) {
        let _footers = await item.getFooter()
        delKey(`model:Footer:${_footers.id}`)
    } else {
        // pack table
        let _has_p = await item.hasPack()
        if (_has_p) {
            let _pack = await item.getPack()
            delKey(`model:Pack:${_pack.id}`)
        }
    }
}

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // TODO: check hasOne or hasMany [Footer, Pack]
            Markdown.hasMany(models.Footer, { foreignKey: 'term_and_condition', as: association.MARKDOWN_TERM_AND_CONDITION, onDelete: 'restrict' })
            Markdown.hasMany(models.Footer, { foreignKey: 'how_to_use', as: association.MARKDOWN_HOW_TO_USE, onDelete: 'restrict' })
            Markdown.hasMany(models.Pack, { foreignKey: 'markdownId', as: association.MARKDOWN_PACK })
        }
    };
    Markdown.init({
        titleEn: DataTypes.TEXT,
        titleTh: DataTypes.TEXT,
        contentEn: DataTypes.TEXT,
        contentTh: DataTypes.TEXT,
        markdownEn: DataTypes.TEXT,
        markdownTh: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Markdown',
        hooks: {
            // TODO: trigger update cache redis ref model
            afterUpdate: async (item, options) => {
                await delKey_Redis(item)
            },
            afterDestroy: async (item, options) => {
                await delKey_Redis(item)
            }
            // TODO: check trigger ref model cache auto update [or not]
        }
    });
    return Markdown;
};