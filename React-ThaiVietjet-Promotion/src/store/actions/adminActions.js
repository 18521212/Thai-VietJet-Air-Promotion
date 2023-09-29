import actionTypes from './actionTypes';

import {
    getAllMenu, getAllMenuItemByMenuId, getAllSubMenuByMenuItemId,
    getAllHeader, getCampaign, getAllBanners,
    getContentBody, getFooter
} from 'services/userService';

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

export const fetchHeader = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllHeader()
            dispatch({
                type: actionTypes.FETCH_HEADER,
                data: res
            })
        } catch (e) {
            console.log('fetchHeader error', e)
        }
    }
}

export const fetchMenu = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllMenu()
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

export const fetchBanner = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBanners()
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
            let res = await getContentBody(id)
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
            let res = await getContentBody(id)
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
            let res = await getFooter()
            dispatch({
                type: actionTypes.FETCH_FOOTER,
                data: res
            })
        } catch (e) {
            console.log('fetchFooter error', e)
        }
    }
}