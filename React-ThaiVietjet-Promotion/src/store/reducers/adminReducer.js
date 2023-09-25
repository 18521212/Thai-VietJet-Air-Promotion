import actionTypes from "store/actions/actionTypes";

const initialState = {
    headers: '',
    menus: '',
    optionMenus: '',
    menuItems: '',
    subMenus: '',
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HEADER:
            return {
                ...state,
                headers: action.data
            }
        case actionTypes.FETCH_MENU:
            let menuData = action.data.data
            let option = [];
            menuData.length > 0 && menuData.map((item) => {
                option.push({ value: item, label: item.name })
            })
            return {
                ...state,
                menus: action.data,
                optionMenus: option
            }
        case actionTypes.FETCH_MENUITEM:
            return {
                ...state,
                menuItems: action.data
            }
        case actionTypes.FETCH_SUBMENU:
            return {
                ...state,
                subMenus: action.data
            }
        default:
            return state;
    }
}

export default adminReducer