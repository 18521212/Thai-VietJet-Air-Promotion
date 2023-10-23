import { resolveObj, func } from '../utils'

const db = require('../models');

let createCampaign = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }
            await db.sequelize.transaction(async (t) => {
                let campaign = await db.Campaign.create({
                    name: data.name,

                    headerId: data.headerId,
                    bannerId: data.bannerId,
                    bodyId: data.bodyId,
                    formId: data.formId,
                    footerId: data.footerId,
                    promotion: data.promotionId
                }, { transaction: t })
            })
            resolve(resolveObj.CREATE_SUCCEED('Campaign'))
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCampaign = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Campaign.findAll();
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e);
        }
    })
}

let getCampaignById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return
            }
            let data = await db.Campaign.findOne({ where: { id: id } });
            resolve(resolveObj.GET(data))
        } catch (e) {
            reject(e);
        }
    })
}

let updateCampaign = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // notice data.property === '' different === null - if have variable but don't 
            // -- have value, it's equal to '', not equal to null
            if (!data.id ||
                !(data.name || data.headerId || data.bannerId
                    || data.bodyId || data.formId || data.footerId || data.promotionId)
            ) {
                resolve(resolveObj.MISSING_PARAMETERS)
                return;
            }

            await db.sequelize.transaction(async (t) => {
                let check = await checkChildTableDataExist(data); // does not pass data does not mean it is null 
                // -- must use compare data !== null
                // console.log(!data.headerId)
                if (check.result !== true) {
                    resolve(resolveObj.NOT_FOUND(check.table_name))
                    throw new Error();
                }

                let dataApi = await db.Campaign.findOne({
                    where: { id: data.id }
                })

                if (!dataApi) {
                    resolve(resolveObj.NOT_FOUND('Campaign'))
                    throw new Error();
                } // resolve specific error - does not effect rollback flow

                let update = await dataApi.update({ // update dont insert if data doesn't exist
                    name: data.name,
                    headerId: data.headerId ? data.headerId : null,
                    bannerId: data.bannerId ? data.bannerId : null,
                    bodyId: data.bodyId ? data.bodyId : null,
                    formId: data.formId ? data.formId : null,
                    footerId: data.footerId ? data.footerId : null,
                    promotionId: data.promotionId ? data.promotionId : null
                }, { transaction: t })
            })

            resolve(resolveObj.UPDATE_SUCCEED('Campaign'))
        } catch (e) {
            reject(e);
        }
    })
}

let deleteCampaign = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve(resolveObj.MISSING_PARAMETERS)
            }

            const result = await db.sequelize.transaction(async (t) => {
                let campaign = await db.Campaign.destroy({ where: { id: id }, transaction: t })
                if (campaign === 0) {
                    resolve(resolveObj.DELETE_UNSUCCEED('Campaign'))
                    throw new Error()
                }
            })
            resolve(resolveObj.DELETE_SUCCEED())
        } catch (e) {
            reject(e);
        }
    })
}

// check reference table exist

let checkChildTableDataExist = async (data) => {
    let result = true;
    let table_name;
    if (data.headerId) {
        let dataApi = await db.Header.findOne({ where: { id: data.headerId } })
        if (!dataApi) {
            console.log('error')
            result = false
            table_name = 'Header'
        }
    }
    if (data.bannerId) {
        let dataApi = await db.Banner.findOne({ where: { id: data.bannerId } })
        if (!dataApi) {
            result = false
            table_name = 'Banner'
        }
    }
    if (data.bodyId) {
        let dataApi = await db.Content_Body.findOne({ where: { id: data.bodyId } })
        if (!dataApi) {
            result = false
            table_name = 'Body'
        }
    }
    if (data.formId) {
        let dataApi = await db.Form.findOne({ where: { id: data.formId } })
        if (!dataApi) {
            result = false
            table_name = 'Form'
        }
    }
    if (data.footerId) {
        let dataApi = await db.Footer.findOne({ where: { id: data.footerId } })
        if (!dataApi) {
            result = false
            table_name = 'Footer'
        }
    }
    if (data.promotionId) {
        let dataApi = await db.Promotion.findOne({ where: { id: data.promotionId } })
        if (!dataApi) {
            result = false
            table_name = 'Promotion'
        }
    }

    return { result, table_name };
}

module.exports = {
    createCampaign: createCampaign,
    getAllCampaign: getAllCampaign,
    getCampaignById: getCampaignById,
    updateCampaign: updateCampaign,
    deleteCampaign: deleteCampaign
}