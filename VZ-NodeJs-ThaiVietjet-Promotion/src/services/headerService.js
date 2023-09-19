const db = require('../models');
const { resolveObj } = require('../utils');
import sequelize from 'sequelize';

// header

let createHeader = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.imageLogo) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                // create header
                let header = await db.Header.create({
                    imageLogo: data.imageLogo,
                    imageBackground: data.imageBackground ? data.imageBackground : null,
                    menuId: data.menuId
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create new Header succeed'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllHeader = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Header.findAll();

            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateHeader = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !(data.imageLogo || data.imageBackground || data.menuId)) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }

            await db.sequelize.transaction(async (t) => { // menuId === '', if(menuId) === if(false)
                if (data.menuId) {
                    let menu = await db.Menu.findOne({ where: { id: data.menuId } })

                    if (!menu) {
                        resolve(resolveObj.NOT_FOUND('Menu'))
                        throw new Error()
                    }
                }
                let header = await db.Header.findOne({ where: { id: data.id } })

                await header.update({ // update only accept 2 argument
                    imageLogo: data.imageLogo,
                    imageBackground: data.imageBackground,
                    menuId: data.menuId
                }, { transaction: t }) // notice dont missing await
            })
            resolve(resolveObj.UPDATE_SUCCEED('Header'))
        } catch (e) {
            reject(e);
        }
    })
}

let deleteHeader = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) { // check empty object
                resolve(resolveObj.MISSING_PARAMETERS)
            } else {
                await db.sequelize.transaction(async (t) => {
                    await db.Header.destroy({ where: { id: id }, transaction: t })
                })

                resolve(resolveObj.DELETE_SUCCEED('Header'))
            }
        } catch (e) {
            reject(e);
        }
    })
}

// menu

let createMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data.id)
            if (!data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
            } else {
                await db.Menu.create({ name: data.name })

                resolve(resolveObj.CREATE_SUCCEED('Menus'))
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllMenu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataApi = await db.Menu.findAll({
                include: [
                    {
                        model: db.Menu_Item, as: 'Menu_Item', attributes: ['id']
                    },
                ],
            })

            resolve(resolveObj.GET(dataApi))
        } catch (e) {
            reject(e);
        }
    })
}

let deleteMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            await db.sequelize.transaction(async (t) => {
                let menuItem = await db.Menu_Item.findAll({ where: { menuId: data.id } })
                if (menuItem.length > 0) {
                    resolve(resolveObj.EXIST_REF_KEY)
                    throw new Error()
                }

                await db.Menu.destroy({ where: { id: data.id }, transaction: t })

                resolve(resolveObj.DELETE_SUCCEED('Menu'))
            })
        } catch (e) {
            reject(e);
        }
    })
}

// menu item

let createMenuItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.menuId || !data.text) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let Text_Translation = await db.Text_Translation.create({
                    valueEn: data.text,
                    valueTh: data.textTh ? data.textTh : data.text
                })
                // create menu item
                await db.Menu_Item.create({
                    order: data.order && data.order,
                    menuId: data.menuId,
                    text: Text_Translation.id,
                    highLight: data.highLight
                })

                resolve({
                    errCode: 0,
                    errMessage: `Create new Menu Item succeed`
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Ok'
            })
        } catch (e) {
            reject(e);
        }
    })
}

let bulkCreateMenuItem = () => {

}

let getAllMenuItemByMenuId = (menuId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!menuId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Menu_Item.findAll({
                    where: {
                        menuId: menuId
                    },
                    include: [
                        { model: db.Text_Translation, as: 'textDataMenu_Item' },
                        {
                            model: db.Sub_Menu,
                            attributes: ['menuParentId', 'order', 'text', 'link'],
                            include: [
                                { model: db.Text_Translation, as: 'textDataSub_Menu' }
                            ]
                        }
                    ]
                })

                resolve({
                    errCode: 0,
                    errMessage: `Ok`,
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateMenuItemById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let menu_item = await db.Menu_Item.findOne({
                    where: {
                        id: data.id
                    }
                })

                await menu_item.update({
                    order: data.order,
                })

                await menu_item.save()

                if (data.text || data.textTh) {
                    let text_translation = await db.Text_Translation.findOne({
                        where: {
                            id: menu_item.text
                        }
                    })

                    await text_translation.update({
                        textEn: data.text,
                        textTh: data.textTh
                    })

                    await text_translation.save()
                }

                resolve({
                    errCode: 0,
                    errMessage: `Update Menu Item succeed`,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteMenuItemById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
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

                let option_text_translation_sub_menu = [];
                list_sub_menu.map((item) => {
                    option_text_translation_sub_menu.push(item.text)
                })


                const result = await db.sequelize.transaction(async (t) => {
                    // bulk delete text_translation sub_menu
                    await db.Text_Translation.destroy({
                        where: {
                            id: option_text_translation_sub_menu
                        }
                    }, { transaction: t })

                    // bulk delete sub_menu
                    await db.Sub_Menu.destroy({
                        where: {
                            menuParentId: id
                        }
                    }, { transaction: t })

                    // delete text_translation menu_item
                    await db.Text_Translation.destroy({
                        where: {
                            id: [menu_item.text]
                        }
                    }, { transaction: t })

                    // delete menu_item
                    await db.Menu_Item.destroy({
                        where: {
                            id: id
                        }
                    }, { transaction: t })
                });

                resolve({
                    errCode: 0,
                    errMessage: `Remove Menu Item with id: ${id} succeed`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

// sub menu

let createSubMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.menuParentId || !data.text) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let Text_Translation = await db.Text_Translation.create({
                    valueEn: data.text,
                    valueTh: data.textTh ? data.textTh : data.text
                })

                await db.Sub_Menu.create({
                    menuParentId: data.menuParentId,
                    order: data.order && data.order,
                    text: Text_Translation.id
                })

                resolve({
                    errCode: 0,
                    errMessage: `Create Sub Menu Succeed`,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSubMenuById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let sub_menu = await db.Sub_Menu.findOne({
                    where: {
                        id: id
                    }
                })
                const result = await db.sequelize.transaction(async (t) => {
                    // remove text_translation sub_menu
                    await db.Text_Translation.destroy({
                        where: {
                            id: sub_menu.text
                        }
                    }, { transaction: t })

                    // remove sub_menu
                    await db.Sub_Menu.destroy({
                        where: {
                            id: id
                        }
                    }, { transaction: t })
                })

                resolve({
                    errCode: 0,
                    errMessage: `Remove Sub Menu with id: ${id} succeed`,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createHeader: createHeader,
    getAllHeader: getAllHeader,
    deleteHeader: deleteHeader,
    updateHeader: updateHeader,

    createMenu: createMenu,
    getAllMenu: getAllMenu,
    deleteMenu: deleteMenu,

    createMenuItem: createMenuItem,
    bulkCreateMenuItem: bulkCreateMenuItem,
    getAllMenuItemByMenuId: getAllMenuItemByMenuId,
    updateMenuItemById: updateMenuItemById,
    deleteMenuItemById: deleteMenuItemById,

    createSubMenu: createSubMenu,
    deleteSubMenuById: deleteSubMenuById,
}