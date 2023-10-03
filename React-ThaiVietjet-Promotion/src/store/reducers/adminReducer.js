import actionTypes from "store/actions/actionTypes";

const initialState = {
    campaigns: '',
    campaign: '',
    headers: '',
    menus: '',
    menuItems: '',
    subMenus: '',
    banners: '',
    banner: '',
    bodys: '',
    forms: '',
    footers: '',
    footer: '',
    campaignOption: [],
    headerOption: [],
    optionMenus: [],
    bannerOption: [],
    bodyOption: [],
    formOption: [],
    footerOption: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CAMPAIGN:
            return mapDataGET(state, action, 'campaign')
        case actionTypes.FETCH_HEADER:
            return {
                ...state,
                headers: action.data,
                headerOption: buildOption(action.data.data)
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
        case actionTypes.FETCH_BANNER:
            return mapDataGET(state, action, 'banner')
        case actionTypes.FETCH_BODY:
            return {
                ...state,
                bodys: action.data,
                bodyOption: buildOption(action.data.data)
            }
        case actionTypes.FETCH_FORM:
            return {
                ...state,
                forms: action.data,
                formOption: buildOption(action.data.data)
            }
        case actionTypes.FETCH_FOOTER:
            return mapDataGET(state, action, 'footer')
        default:
            return state;
    }
}

const mapDataGET = (state = initialState, action, name) => {
    if (Array.isArray(action.data.data)) {
        return {
            ...state,
            [name + 's']: action.data,
            [name + 'Option']: buildOption(action.data.data)
        }
    } else {
        return {
            ...state,
            [name]: action.data
        }
    }
}

const buildOption = (data) => {
    let option = []
    data.map((item) => {
        option.push({ value: item, label: item.name ? item.name : 'id: ' + item.id })
    })
    return option
}

export default adminReducer