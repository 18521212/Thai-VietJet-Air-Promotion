import actionTypes from './actionTypes';

import {
    getAllMenu, getAllMenuItemByMenuId, getAllSubMenuByMenuItemId,
    getAllHeader, getAllCampaign, getCampaign
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