import actionTypes from "store/actions/actionTypes";

const initialState = {
    menus: [],
    menuItems: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MENU:
            let copyState = { ...state }
            copyState.menus = action.data
            return {
                ...copyState
            }
        case actionTypes.FETCH_MENUITEM:
            return {
                ...copyState,
                menuItems: action.data
            }
        default:
            return state;
    }
}

export default adminReducer