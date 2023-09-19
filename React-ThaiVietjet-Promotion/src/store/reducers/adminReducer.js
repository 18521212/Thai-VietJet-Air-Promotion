import actionTypes from "store/actions/actionTypes";

const initialState = {
    menus: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MENU:
            let copyState = { ...state }
            copyState.menus = action.data
            return {
                ...copyState
            }
        default:
            return state;
    }
}

export default adminReducer