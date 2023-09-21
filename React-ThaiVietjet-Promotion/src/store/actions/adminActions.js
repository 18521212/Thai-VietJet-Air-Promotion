import actionTypes from './actionTypes';

import { getAllMenu, getAllMenuItemByMenuId } from 'services/userService';

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
            dispatch({
                type: actionTypes.FETCH_MENUITEM,
                data: res
            })
        } catch (e) {
            console.log('fetchMenuItem error', e)
        }
    }
}