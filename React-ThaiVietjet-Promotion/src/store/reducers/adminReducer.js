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
    body: '',
    forms: '',
    footers: '',
    footer: '',
    footer_texts: '',
    form_detail: '',
    inputs: '',
    promotions: '',
    packs: '',
    campaignOption: [],
    headerOption: [],
    optionMenus: [],
    bannerOption: [],
    bodyOption: [],
    formOption: [],
    footerOption: [],
    footer_textOption: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_USER:
            return {
                ...state,
                user: action.data
            }
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                user: null
            }
        case actionTypes.FETCH_CAMPAIGN:
            return mapDataGET(state, action, 'campaign')
        case actionTypes.FETCH_HEADER:
            return mapDataGET(state, action, 'header')
        case actionTypes.FETCH_MENU:
            return mapDataGET(state, action, 'menu')
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
            return mapDataGET(state, action, 'body')
        case actionTypes.FETCH_FORM:
            return mapDataGET(state, action, 'form')
        case actionTypes.FETCH_FOOTER:
            return mapDataGET(state, action, 'footer')
        case actionTypes.FETCH_FOOTER_TEXT:
            return mapDataGET(state, action, 'footer_text')
        case actionTypes.FETCH_FORM_DETAIL_BY_FORM:
            return mapDataGET(state, action, 'form_detail')
        case actionTypes.FETCH_INPUT:
            return mapDataGET(state, action, 'input')
        case actionTypes.FETCH_PROMOTION:
            return mapDataGET(state, action, 'promotion')
        case actionTypes.FETCH_PACK:
            return mapDataGET(state, action, 'pack')
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