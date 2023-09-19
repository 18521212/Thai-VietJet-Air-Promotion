import actionTypes from './actionTypes';

import { getAllMenu } from 'services/userService';

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