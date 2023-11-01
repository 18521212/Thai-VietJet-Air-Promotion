import { Component } from "react";
import './Header.scss';
import logo from '../../../assets/Logo/skyfun_logo.png';
import Select from 'react-select'
import { getAllMenuItemByMenuId, getHeader } from "../../../services/userService";
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp, fetchHeader, fetchMenu } from '../../../store/actions';
import * as actions from 'store/actions';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstMenus: '',
            lastMenus: '',
            header: '',
            selectedLanguage: '',
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        await this.props.loadHeader(this.props.headerId)
        await this.props.loadMenu(this.props.header?.data?.menuId)
        this.buildData()
    }

    buildData = () => {
        let lastMenus, firstMenus
        if (this.props.menu?.data) {
            let menuItemData = this.props.menu.data.menu_item
            lastMenus = menuItemData.filter((data) => data.order === -1);
            firstMenus = menuItemData.filter((data) => data.order !== -1);
            firstMenus.sort((a, b) => a.order - b.order);
        }
        this.setState({
            firstMenus: firstMenus,
            lastMenus: lastMenus,
            header: this.props.header.data
        })
    }

    handleOnChangeSelect = (selectLanguageObject, action) => {
        let stateCopy = { ...this.state };
        stateCopy[action.name] = selectLanguageObject;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeLanguage = (event) => {
        let language = event.target.name
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let { firstMenus, lastMenus, header } = this.state;
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
                        <Link className="navbar-brand" to='/'>
                            <img src={header.imageLogo} alt='logo' />
                        </Link>
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
                                {firstMenus && firstMenus.length > 0 &&
                                    firstMenus.map((item, index) => {
                                        let attributes = item.sub_menu.length > 0 ?
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
                                                    className={`nav-item ${item.sub_menu.length > 0 ? 'dropdown' : ''} 
                                                    
                                                    `}
                                                    key={index}
                                                >
                                                    <a
                                                        className={
                                                            `${item.sub_menu.length > 0 ? 'dropdown-toggle' : ''} ` +
                                                            `${item.highlight && 'highlight'} ` +
                                                            'nav-link'
                                                        }
                                                        key={index}
                                                        href={`${item.sub_menu.length > 0 ? '#' : item.link ? item.link : '#'}`}
                                                        {...attributes}
                                                        style={{ background: item.highlight !== 'default' ? item.highlight : false }}
                                                    >
                                                        {language === 'en' ?
                                                            item.textDataMenu_Item.valueEn
                                                            :
                                                            item.textDataMenu_Item.valueTh
                                                        }
                                                    </a>
                                                    {item.sub_menu && item.sub_menu.length > 0 &&
                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            {item.sub_menu.map((item, index) => {
                                                                return (
                                                                    <a className="dropdown-item" key={index} href={item.link ? item.link : '#'}>
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
                                <li className="nav-item dropdown sl-lan">
                                    <a className="nav-link dropdown-toggle" href="#"
                                        id="navbarDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        {language === 'en' ?
                                            'English'
                                            :
                                            'ภาษาไทย'
                                        }
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            name={LANGUAGES.EN}
                                            onClick={(event) => this.handleOnChangeLanguage(event)}
                                        >
                                            English
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            name={LANGUAGES.TH}
                                            onClick={(event) => this.handleOnChangeLanguage(event)}
                                        >
                                            ภาษาไทย
                                        </a>
                                    </div>
                                </li>
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
        language: state.app.language,
        header: state.admin.header,
        menu: state.admin.menu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        loadHeader: (id) => dispatch(actions.fetchHeader(id)),
        loadMenu: (id) => dispatch(actions.fetchMenu(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);