import { Component } from "react";
import './Header.scss';
import logo from '../../../assets/Logo/skyfun_logo.png';
import Select from 'react-select'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { getAllMenuItemByMenuId, getAllHeader } from "../../../services/userService";

import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            menuItem: '',
            menuLanguage: '',
            header: '',

            selectedLanguage: '',
        }
    }

    componentDidMount() {
        this.buildData()
    }

    buildData = async () => {
        let menuItemData = await getAllMenuItemByMenuId(1);
        console.log(menuItemData)
        let menuLanguage = menuItemData.data.filter((data) => data.order === -1);
        let menuItem;
        menuItem = menuItemData.data.filter((data) => data.order !== -1);
        menuItem.sort((a, b) => a.order - b.order);
        // console.log('check menu item:', menuItem.data, menuItem, menuLanguage)

        let header = await getAllHeader();

        this.setState({
            menuItem: menuItem,
            menuLanguage: menuLanguage,
            header: header.data[0]
        })
    }

    handleOnChangeSelect = (selectLanguageObject, action) => {
        let stateCopy = { ...this.state };
        stateCopy[action.name] = selectLanguageObject;
        this.setState({
            ...stateCopy
        })
    }

    toggle(id) {
        let stateCopy = { ...this.state }
        let toggle = stateCopy[id]
        stateCopy[id] = !toggle
        this.setState({
            ...stateCopy
        })
        // this.setState(prevState => ({
        //     dropdownOpenShopping: !prevState.dropdownOpenShopping
        // }));
    }

    handleOnChangeLanguage = (event) => {
        let language = event.target.name
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let { menuItem, menuLanguage, header } = this.state;
        let mainUrl = 'https://vietjetthai.com';
        let { language } = this.props;
        return (
            <>
                <header
                    className="bg-header"
                    style={{ backgroundImage: `url(${header.imageBackground})` }}
                >
                    {/* <h1><FormattedMessage id="header.language" /></h1> */}
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid sticky-top">
                        <a className="navbar-brand" href={mainUrl}>
                            <img src={logo} alt='logo' />
                        </a>
                        <button
                            className="navbar-toggler col-2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                {menuItem && menuItem.length > 0 &&
                                    menuItem.map((item, index) => {
                                        let attributes = item.Sub_Menus.length > 0 ?
                                            {
                                                'id': "navbarDropdown1",
                                                'role': "button",
                                                'data-toggle': "dropdown",
                                                'aria-haspopup': "false",
                                                'aria-expanded': "false"
                                            }
                                            :
                                            {};
                                        return (
                                            <>
                                                <li
                                                    className={`nav-item ${item.Sub_Menus.length > 0 ? 'dropdown' : ''} 
                                                    
                                                    `}
                                                    key={index}
                                                >
                                                    <a
                                                        className={
                                                            `${item.Sub_Menus.length > 0 ? 'dropdown-toggle' : ''} ` +
                                                            `${item.highLight && 'highlight'} ` +
                                                            'nav-link'
                                                        }
                                                        href={`${item.Sub_Menus.length > 0 ? '#' : item.link ? item.link : '#'}`}
                                                        {...attributes}
                                                        // id="navbarDropdown1"
                                                        // role="button"
                                                        // data-toggle="dropdown"
                                                        // aria-haspopup="false"
                                                        // aria-expanded="false"
                                                        style={{ background: item.highLight !== 'default' ? item.highLight : false }}
                                                    >
                                                        {language === 'en' ?
                                                            item.textDataMenu_Item.valueEn
                                                            :
                                                            item.textDataMenu_Item.valueTh
                                                        }
                                                    </a>
                                                    {item.Sub_Menus && item.Sub_Menus.length > 0 &&
                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            {item.Sub_Menus.map((item, index) => {
                                                                return (
                                                                    <a className="dropdown-item" href={"#"}>
                                                                        {language === 'en' ?
                                                                            item.textDataSub_Menu.valueEn
                                                                            :
                                                                            item.textDataSub_Menu.valueTh
                                                                        }
                                                                    </a>
                                                                )
                                                            })}
                                                        </div>
                                                    }
                                                </li >
                                            </>
                                        )
                                    })
                                }
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                {menuLanguage && menuLanguage.length > 0 &&
                                    menuLanguage.map((item, index) => {
                                        return (
                                            <>
                                                <li className="nav-item dropdown sl-lan">
                                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {item.Sub_Menus.length > 0 ?
                                                            (language === 'en' ?
                                                                item.Sub_Menus.filter(a => a.textDataSub_Menu.valueEn === 'English')[0].textDataSub_Menu.valueEn
                                                                :
                                                                item.Sub_Menus.filter(a => a.textDataSub_Menu.valueEn === 'Thai')[0].textDataSub_Menu.valueTh
                                                            )
                                                            :
                                                            item.textDataMenu_Item.valueEn
                                                        }
                                                    </a>
                                                    {item.Sub_Menus && item.Sub_Menus.length > 0 &&
                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            {item.Sub_Menus.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                            name={
                                                                                item.textDataSub_Menu.valueEn === 'English' ? LANGUAGES.EN :
                                                                                    item.textDataSub_Menu.valueEn === 'Thai' ? LANGUAGES.TH : LANGUAGES.TH
                                                                            }
                                                                            onClick={(event) => this.handleOnChangeLanguage(event)}
                                                                        >
                                                                            {item.textDataSub_Menu.valueEn === 'English' ?
                                                                                item.textDataSub_Menu.valueEn
                                                                                :
                                                                                item.textDataSub_Menu.valueTh
                                                                            }
                                                                        </a>
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    }
                                                </li>
                                            </>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                    </nav>
                </header >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);