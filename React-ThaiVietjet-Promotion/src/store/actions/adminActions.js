import actionTypes from './actionTypes';

import {
    getCampaign,
} from 'services/userService';
import {
    getHeader, getMenu, getAllMenuItemByMenuId,
    getAllSubMenuByMenuItemId
} from 'services/headerService';
import { getBanner } from 'services/bannerService'
import { getBody } from 'services/bodyService'
import {
    getInput, getForm,
    getFormDetailByFormId,
} from 'services/formService'
import { getFooter, getFooterText, getMarkdown } from 'services/footerService'
import { getPromotion, getPack } from 'services/promotionService'

export const saveUser = (user) => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.SAVE_USER,
                data: user
            })
        } catch (e) {
            console.log('saveUser error', e)
        }
    }
}

export const clearUser = () => {
    return (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CLEAR_USER,
            })
        } catch (e) {
            console.log('clearUser error', e)
        }
    }
}

export const fetchCampaign = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getCampaign(id)
            dispatch({
                type: actionTypes.FETCH_CAMPAIGN,
                data: res
            })
        } catch (e) {
            console.log('fetchHeader error', e)
        }
    }
}

export const fetchHeader = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getHeader(id)
            dispatch({
                type: actionTypes.FETCH_HEADER,
                data: res
            })
        } catch (e) {
            console.log('fetchHeader error', e)
        }
    }
}

export const fetchMenu = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getMenu(id)
            dispatch({
                type: actionTypes.FETCH_MENU,
                data: res
            })
        } catch (e) {
            console.log('fetchMenu error', e)
        }
    }
}

export const fetchMenuItem = (menuId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllMenuItemByMenuId(menuId)
            res.data = res.data.sort((a, b) => a.order - b.order);
            dispatch({
                type: actionTypes.FETCH_MENUITEM,
                data: res
            })
        } catch (e) {
            console.log('fetchMenuItem error', e)
        }
    }
}

export const fetchSubMenu = (menuParentId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSubMenuByMenuItemId(menuParentId)
            res.data = res.data.sort((a, b) => a.order - b.order);
            dispatch({
                type: actionTypes.FETCH_SUBMENU,
                data: res
            })
        } catch (e) {
            console.log('fetchSubMenu error', e)
        }
    }
}

export const fetchBanner = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getBanner(id)
            dispatch({
                type: actionTypes.FETCH_BANNER,
                data: res
            })
        } catch (e) {
            console.log('fetchBanner error', e)
        }
    }
}

export const fetchBody = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getBody(id)
            dispatch({
                type: actionTypes.FETCH_BODY,
                data: res
            })
        } catch (e) {
            console.log('fetchBody error', e)
        }
    }
}

export const fetchForm = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getForm(id)
            dispatch({
                type: actionTypes.FETCH_FORM,
                data: res
            })
        } catch (e) {
            console.log('fetchForm error', e)
        }
    }
}

export const fetchFooter = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getFooter(id)
            dispatch({
                type: actionTypes.FETCH_FOOTER,
                data: res
            })
        } catch (e) {
            console.log('fetchFooter error', e)
        }
    }
}

export const fetchFooterText = (footerId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getFooterText(footerId)
            dispatch({
                type: actionTypes.FETCH_FOOTER_TEXT,
                data: res
            })
        } catch (e) {
            console.log('fetchFooter error', e)
        }
    }
}

export const fetchFormDetailByFormId = (formId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getFormDetailByFormId(formId)
            dispatch({
                type: actionTypes.FETCH_FORM_DETAIL_BY_FORM,
                data: res
            })
        } catch (e) {
            console.log('fetchFooter error', e)
        }
    }
}
export const fetchInput = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getInput(inputId)
            dispatch({
                type: actionTypes.FETCH_INPUT,
                data: res
            })
        } catch (e) {
            console.log('fetchInput error', e)
        }
    }
}

export const fetchPromotion = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getPromotion(id)
            dispatch({
                type: actionTypes.FETCH_PROMOTION,
                data: res
            })
        } catch (e) {
            console.log('fetchPromotion error', e)
        }
    }
}

export const fetchPack = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getPack(id)
            dispatch({
                type: actionTypes.FETCH_PACK,
                data: res
            })
        } catch (e) {
            console.log('fetchPack error', e)
        }
    }
}

export const fetchMarkdown = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getMarkdown(id)
            console.log('m',res)
            dispatch({
                type: actionTypes.FETCH_MARKDOWN,
                data: res
            })
        } catch (e) {
            console.log('fetchMarkdown error', e)
        }
    }
}