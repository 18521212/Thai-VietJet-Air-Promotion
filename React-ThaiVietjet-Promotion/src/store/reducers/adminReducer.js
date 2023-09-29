import actionTypes from "store/actions/actionTypes";

const initialState = {
    campaigns: '',
    campaign: '',
    headers: '',
    menus: '',
    optionMenus: '',
    menuItems: '',
    subMenus: '',
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CAMPAIGN:
            // console.log('res',action.data)
            if (Array.isArray(action.data.data)) {
                // console.log('arr')
                return {
                    ...state,
                    campaigns: action.data
                }
            } else {
                // console.log('sing')
                return {
                    ...state,
                    campaign: action.data
                }
            }

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