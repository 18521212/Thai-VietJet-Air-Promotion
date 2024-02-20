const db = require('../models');
const { resolveObj, func } = require('../utils');
import sequelize from 'sequelize';

// header

let createHeader = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!func.CHECK_HAS_VALUE(data.imageLogo)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _cre_h = await db.Header.create({
                    imageLogo: data.imageLogo,
                    imageBackground: data.imageBackground,
                    menuId: data.menuId
                })
                if (_cre_h) {
                    _response = resolveObj.CREATE_SUCCEED()
                } else {
                    _response = resolveObj.CREATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let decodeImageOfHeader = (header) => {
    if (header.imageLogo) {
        header.imageLogo = func.DECODE_IMAGE(header.imageLogo)
    }
    if (header.imageBackground) {
        header.imageBackground = func.DECODE_IMAGE(header.imageBackground)
    }
}

let getHeader = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data
            let _response
            // TODO: response too long for cache [decode image]
            if (id) {
                data = await db.Header
                    // .cache()
                    .findByPk(id)
                decodeImageOfHeader(data)
            } else {
                data = await db.Header
                    // .cache('all')
                    .findAll();
                if (data) data.map(item => {
                    decodeImageOfHeader(item)
                })
            }
            _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateHeader = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id || !(data.imageLogo || data.imageBackground || data.menuId)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _valid_update = true
                if (data.menuId) {
                    let menu = await db.Menu.findOne({ where: { id: data.menuId } })
                    if (!menu) {
                        _valid_update = false
                        _response = resolveObj.NOT_FOUND('Menu')
                    }
                }
                if (_valid_update) {
                    let _get_h = await db.Header.findByPk(data.id)
                    let _upd_h = await _get_h
                        .cache()
                        .update({
                            imageLogo: data.imageLogo,
                            imageBackground: data.imageBackground,
                            menuId: data.menuId
                        })
                    if (_upd_h) {
                        _response = resolveObj.UPDATE_SUCCEED()
                    } else {
                        _response = resolveObj.UPDATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteHeader = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!id) { // check empty object
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_h = await db.Header.findByPk(id)
                let _del_h = await _get_h
                    .cache()
                    .destroy()
                if (_del_h) {
                    _response = resolveObj.DELETE_SUCCEED()
                } else {
                    _response = resolveObj.DELETE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

// menu

let createMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.name) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _cre_m = await db.Menu.create({ name: data.name })
                if (_cre_m) {
                    _response = resolveObj.CREATE_SUCCEED()
                } else {
                    _response = resolveObj.CREATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let getMenu = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data
            let _response
            if (id) {
                data = await db.Menu
                    .cache(id)
                    .findOne({
                        where: { id: id },
                        include: [
                            {
                                model: db.Menu_Item, as: 'menu_item',
                                include: [
                                    { model: db.Text_Translation, as: 'textDataMenu_Item' },
                                    {
                                        model: db.Sub_Menu, as: 'sub_menu',
                                        attributes: ['menuParentId', 'order', 'text', 'link'],
                                        include: [
                                            { model: db.Text_Translation, as: 'textDataSub_Menu' }
                                        ]
                                    }
                                ]
                            },
                        ],
                    })
            } else {
                data = await db.Menu
                    .cache('all')
                    .findAll({
                        include: [
                            {
                                model: db.Menu_Item, as: 'menu_item', attributes: ['id']
                            },
                        ],
                    });
            }
            _response = resolveObj.GET(data)
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id || !data.name) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_m = await db.Menu.findByPk(data.id)
                let _upd_m = await _get_m
                    .cache()
                    .update({
                        name: data.name
                    })
                if (_upd_m) {
                    _response = resolveObj.UPDATE_SUCCEED()
                } else {
                    _response = resolveObj.UPDATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let menuItem = await db.Menu_Item.findAll({ where: { menuId: data.id } })
                if (menuItem.length > 0) {
                    _response = resolveObj.EXIST_REF_KEY
                } else {
                    let _get_m = await db.Menu.findByPk(data.id)
                    let _del_m = await _get_m
                        .cache()
                        .destroy()
                    if (_del_m) {
                        _response = resolveObj.DELETE_SUCCEED()
                    } else {
                        _response = resolveObj.DELETE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

// menu item

let createMenuItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.menuId || !data.valueEn) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_m = await db.Menu.findByPk(menuId)
                if (!_get_m) {
                    _response = resolveObj.NOT_FOUND()
                } else {
                    let _transaction_status = false
                    await db.sequelize.transaction(async (t) => {
                        let Text_Translation = await db.Text_Translation.create({
                            valueEn: data.valueEn,
                            valueTh: data.valueTh ? data.valueTh : data.valueEn
                        })
                        await db.Menu_Item.create({
                            order: data.order && data.order,
                            menuId: data.menuId,
                            text: Text_Translation.id,
                            highlight: data.highlight,
                            link: data.link
                        })
                        _transaction_status = true
                    })
                    if (_transaction_status) {
                        _response = resolveObj.CREATE_SUCCEED()
                    } else {
                        _response = resolveObj.CREATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let bulkCreateMenuItem = () => {
    // TODO: implement bulk create
}

let getAllMenuItemByMenuId = (menuId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!menuId) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let data = await db.Menu_Item.findAll({
                    where: {
                        menuId: menuId
                    },
                    include: [
                        { model: db.Text_Translation, as: 'textDataMenu_Item' },
                        {
                            model: db.Sub_Menu, as: 'sub_menu',
                            attributes: ['menuParentId', 'order', 'text', 'link'],
                            include: [
                                { model: db.Text_Translation, as: 'textDataSub_Menu' }
                            ]
                        }
                    ]
                })
                _response = resolveObj.GET(data)
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateMenuItemById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id || (!data.order && !data.link && !data.valueEn && !data.valueTh && !data.highlight)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _transaction_status = false
                let _get_mi = await db.Menu_Item.findByPk(data.id)
                await db.sequelize.transaction(async (t) => {
                    await _get_mi.update({
                        order: data.order,
                        link: data.link,
                        highlight: data.highlight
                    }, { transaction: t })
                    if (data.valueEn || data.valueTh) {
                        let _get_tt = await db.Text_Translation.findByPk(menu_item.text)
                        await _get_tt.update({
                            valueEn: data.valueEn,
                            valueTh: data.valueTh
                        }, { transaction: t })
                    }
                    _transaction_status = true
                })
                if (_transaction_status) {
                    _response = resolveObj.UPDATE_SUCCEED()
                } else {
                    _response = resolveObj.UPDATE_UNSUCCEED()
                }
            }
            resolve(_responses)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteMenuItemById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let menu_item = await db.Menu_Item.findOne({
                    where: {
                        id: id
                    }
                })
                let list_sub_menu = await db.Sub_Menu.findAll({
                    where: {
                        menuParentId: id
                    }
                })
                if (list_sub_menu.length > 0) {
                    _response = resolveObj.EXIST_REF_KEY
                } else {
                    let _transaction_status = false
                    const result = await db.sequelize.transaction(async (t) => {
                        // delete text_translation menu_item
                        await db.Text_Translation.destroy({
                            where: {
                                id: [menu_item.text]
                            },
                            transaction: t
                        })
                        // delete menu_item
                        await db.Menu_Item.destroy({
                            where: {
                                id: id
                            },
                            transaction: t
                        })
                        _transaction_status = true
                    });
                    _response = resolveObj.DELETE_SUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

// sub menu

let createSubMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.menuParentId || !data.valueEn) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _transaction_status = false
                await db.sequelize.transaction(async (t) => {
                    let Text_Translation = await db.Text_Translation.create({
                        valueEn: data.valueEn,
                        valueTh: data.valueTh ? data.valueTh : data.valueEn
                    }, { transaction: t })

                    await db.Sub_Menu.create({
                        menuParentId: data.menuParentId,
                        order: data.order && data.order,
                        text: Text_Translation.id,
                        link: data.link
                    }, { transaction: t })
                    _transaction_status = true
                })
                if (_transaction_status) {
                    _response = resolveObj.CREATE_SUCCEED()
                } else {
                    _response = resolveObj.CREATE_UNSUCCEED()
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllSubMenuByMenuItemId = (menuParentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!menuParentId) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_sm = await db.Sub_Menu.findAll({
                    where: { menuParentId: menuParentId },
                    include: [
                        { model: db.Text_Translation, as: 'textDataSub_Menu' }
                    ]
                })
                _response = resolveObj.GET(_get_sm)
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let updateSubMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id || (!data.order && !data.valueEn && !data.valueTh && !data.link)) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_sm = await db.Sub_Menu.findByPk(data.id)
                if (!_get_sm) {
                    _response = resolveObj.NOT_FOUND('Menu Item')
                } else {
                    let _transaction_status = false
                    const result = await db.sequelize.transaction(async (t) => {
                        await _get_sm.update({
                            order: data.order,
                            link: data.link
                        }, { transaction: t })
                        if (data.valueEn || data.valueTh) {
                            let _get_tt = await db.Text_Translation.findOne({ where: { id: sub_menu.text } })
                            await _get_tt.update({
                                valueEn: data.valueEn,
                                valueTh: data.valueTh
                            }, { transaction: t })
                        }
                        _transaction_status = true
                    })
                    if (_transaction_status) {
                        _response = resolveObj.UPDATE_SUCCEED()
                    } else {
                        _response = resolveObj.UPDATE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSubMenuById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_sm = await db.Sub_Menu.findByPk(id)
                if (!_get_sm) {
                    _response = resolveObj.NOT_FOUND('Menu Item')
                } else {
                    let _transaction_status = false
                    const result = await db.sequelize.transaction(async (t) => {
                        // remove text_translation sub_menu
                        await db.Text_Translation.destroy({
                            where: {
                                id: sub_menu.text
                            },
                            transaction: t
                        })

                        // remove sub_menu
                        await db.Sub_Menu.destroy({
                            where: {
                                id: id
                            },
                            transaction: t
                        })
                        _transaction_status = true
                    })
                    if (_transaction_status) {
                        _response = resolveObj.DELETE_SUCCEED()
                    } else {
                        _response = resolveObj.DELETE_UNSUCCEED()
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createHeader: createHeader,
    getHeader,
    deleteHeader: deleteHeader,
    updateHeader: updateHeader,

    createMenu: createMenu,
    getMenu,
    updateMenu: updateMenu,
    deleteMenu: deleteMenu,

    createMenuItem: createMenuItem,
    bulkCreateMenuItem: bulkCreateMenuItem,
    getAllMenuItemByMenuId: getAllMenuItemByMenuId,
    updateMenuItemById: updateMenuItemById,
    deleteMenuItemById: deleteMenuItemById,

    createSubMenu: createSubMenu,
    getAllSubMenuByMenuItemId: getAllSubMenuByMenuItemId,
    updateSubMenu: updateSubMenu,
    deleteSubMenuById: deleteSubMenuById,
}