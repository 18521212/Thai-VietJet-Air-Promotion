import { resolveObj, func } from '../utils'

const db = require('../models');

let createCampaign = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.name) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _cre_c =
                    await db.Campaign
                        .create({
                            name: data.name,
                            headerId: data.headerId,
                            bannerId: data.bannerId,
                            bodyId: data.bodyId,
                            formId: data.formId,
                            footerId: data.footerId,
                            promotion: data.promotionId
                        })
                if (_cre_c) {
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

// TODO: get campaign route name

let getCampaign = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            let _data
            if (id) {
                _data =
                    await db.Campaign
                        .cache()
                        .findByPk(id);
            } else {
                _data =
                    await db.Campaign
                        .cache('all')
                        .findAll({
                            order: [['createdAt', 'DESC']],
                        });
            }
            _response = resolveObj.GET(_data)
            resolve(_response)
        } catch (e) {
            reject(e)
        }
    })
}

let updateCampaign = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!data.id ||
                !(data.name || data.headerId || data.bannerId
                    || data.bodyId || data.formId || data.footerId || data.promotionId)
            ) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let check = await checkChildTableDataExist(data);
                if (check.result !== true) {
                    _response = resolveObj.NOT_FOUND(check.table_name)
                } else {
                    let _get_c =
                        await db.Campaign
                            .findByPk(data.id)
                    if (!_get_c) {
                        _response = resolveObj.NOT_FOUND('Campaign')
                    } else {
                        let _upd_c =
                            await _get_c
                                .update({
                                    name: data.name,
                                    headerId: data.headerId ? data.headerId : null,
                                    bannerId: data.bannerId ? data.bannerId : null,
                                    bodyId: data.bodyId ? data.bodyId : null,
                                    formId: data.formId ? data.formId : null,
                                    footerId: data.footerId ? data.footerId : null,
                                    promotionId: data.promotionId ? data.promotionId : null
                                })
                        if (_upd_c) {
                            _response = resolveObj.UPDATE_SUCCEED()
                        } else {
                            _response = resolveObj.UPDATE_UNSUCCEED()
                        }
                    }
                }
            }
            resolve(_response)
        } catch (e) {
            reject(e);
        }
    })
}

let deleteCampaign = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _response
            if (!id) {
                _response = resolveObj.MISSING_PARAMETERS
            } else {
                let _get_c =
                    await db.Campaign
                        .cache()
                        .findByPk(id)
                let _del_c =
                    await _get_c
                        .cache()
                        .destroy()
                if (_del_c) {
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

// check reference table exist
let checkChildTableDataExist = async (data) => {
    // TODO: onCreate, onDelete, onUpdate constraint
    let result = true;
    let table_name;
    if (data.headerId) {
        let dataApi = await db.Header.findOne({ where: { id: data.headerId } })
        if (!dataApi) {
            result = false
            table_name = 'Header'
        }
    }
    else if (data.bannerId) {
        let dataApi = await db.Banner.findOne({ where: { id: data.bannerId } })
        if (!dataApi) {
            result = false
            table_name = 'Banner'
        }
    }
    else if (data.bodyId) {
        let dataApi = await db.Content_Body.findOne({ where: { id: data.bodyId } })
        if (!dataApi) {
            result = false
            table_name = 'Body'
        }
    }
    else if (data.formId) {
        let dataApi = await db.Form.findOne({ where: { id: data.formId } })
        if (!dataApi) {
            result = false
            table_name = 'Form'
        }
    }
    else if (data.footerId) {
        let dataApi = await db.Footer.findOne({ where: { id: data.footerId } })
        if (!dataApi) {
            result = false
            table_name = 'Footer'
        }
    }
    else if (data.promotionId) {
        let dataApi = await db.Promotion.findOne({ where: { id: data.promotionId } })
        if (!dataApi) {
            result = false
            table_name = 'Promotion'
        }
    }
    return { result, table_name };
}

module.exports = {
    createCampaign,
    getCampaign,
    updateCampaign,
    deleteCampaign
}