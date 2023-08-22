const db = require('../models');

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
                    imageBackground: data.imageBackground ? data.imageBackground : null
                })

                // create menu
                await db.Menu.create({
                    headerId: header.id
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create new Header succeed'
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

let getAllHeader = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Header.findAll();

            resolve({
                errCode: 0,
                errMessage: 'Create new Header succeed',
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createMenuItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.menuId || !data.text) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                // create menu item
                await db.Menu_Item.create({
                    order: data.order && data.order,
                    menuId: data.menuId,
                    text: data.text,
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
                        {
                            model: db.Sub_Menu,
                            attributes: ['menuParentId', 'order', 'text', 'link']
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

let createSubMenu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.menuParentId || !data.text) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                await db.Sub_Menu.create({
                    menuParentId: data.menuParentId,
                    order: data.order && data.order,
                    text: data.text
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

module.exports = {
    createHeader: createHeader,
    getAllHeader: getAllHeader,

    createMenuItem: createMenuItem,
    bulkCreateMenuItem: bulkCreateMenuItem,
    getAllMenuItemByMenuId: getAllMenuItemByMenuId,

    createSubMenu: createSubMenu
}