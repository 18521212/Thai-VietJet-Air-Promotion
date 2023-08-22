import { Component } from "react";
import './Header.scss';
import logo from '../../../assets/Logo/skyfun_logo.png';
import Select from 'react-select'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { getAllMenuItemById, getAllHeader } from "../../../services/userService";

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            selectedLanguage: '',
            dropdownOpenShopping: false,
            dropdownOpenTravelInfo: false,
            menuItem: '',
            menuLanguage: '',
            header: '',

            optionLanguage: [
                { value: 'TH', label: 'Thai' },
                { value: 'EN', label: 'English' },
            ],

        }
    }

    componentDidMount() {
        this.setState({
            selectedLanguage: this.state.optionLanguage[0]
        })
        this.buildData()
    }

    buildData = async () => {
        let menuItemData = await getAllMenuItemById(1);
        let menuLanguage = menuItemData.data.data.filter((data) => data.order === -1);
        let menuItem;
        menuItem = menuItemData.data.data.filter((data) => data.order !== -1);
        menuItem.sort((a, b) => a.order - b.order);
        // console.log('check menu item:', menuItem.data, menuItem, menuLanguage)

        let header = await getAllHeader();
        console.log('header:', header)

        this.setState({
            menuItem: menuItem,
            menuLanguage: menuLanguage,
            header: header.data.data[0]
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

    render() {

        let { selectedLanguage, optionLanguage, dropdownOpenShopping,
            dropdownOpenTravelInfo, menuItem, menuLanguage, header } = this.state;
        let mainUrl = 'https://vietjetthai.com';
        let giftUrl = 'https://gift.th.vietjetair.com';
        return (
            <>
                <div className="header" style={{ backgroundImage: `url(${header.imageBackground})` }}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
                        <a className="navbar-brand col-xl-4 col-9" href={mainUrl}>
                            <img src={logo} alt='logo' />
                        </a>
                        <button className="navbar-toggler col-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="menu collapse navbar-collapse col-xl-8" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                {menuItem && menuItem.length > 0 &&
                                    menuItem.map((item, index) => {
                                        return (
                                            <>
                                                <li className={`nav-item ${item.Sub_Menus.length > 0 ? 'dropdown' : ''}`} key={index}>
                                                    <a className={`nav-link 
                                                    ${item.Sub_Menus.length > 0 ? 'dropdown-toggle' : ''}
                                                     ${item.text === 'Shopping' ? 'shopping' : ''}`}
                                                        href={`${item.Sub_Menus.length > 0 ? '#' : item.link ? item.link : '#'}`}
                                                        id="navbarDropdown1"
                                                        role="button"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="false"
                                                        aria-expanded="false"
                                                    >{item.text}</a>
                                                    {item.Sub_Menus && item.Sub_Menus.length > 0 &&
                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            {item.Sub_Menus.map((item, index) => {
                                                                return (
                                                                    <a className="dropdown-item" href={"#"}>{item.text}</a>
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
                            <ul className="navbar-nav ml-auto">
                                {menuLanguage && menuLanguage.length > 0 &&
                                    menuLanguage.map((item, index) => {
                                        return (
                                            <>
                                                <li className="nav-item dropdown sl-lan">
                                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {item.Sub_Menus.length > 0 ? item.Sub_Menus[0].text : item.text}
                                                    </a>
                                                    {item.Sub_Menus && item.Sub_Menus.length > 0 &&
                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            {item.Sub_Menus.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <a className="dropdown-item" href="#">{item.text}</a>
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
                </div >
            </>
        )
    }
}

export default Header;

{/* <Select
    value={selectedLanguage}
    options={optionLanguage}
    placeholder={selectedLanguage.label}
    onChange={this.handleOnChangeSelect}
    name={"selectedLanguage"}
    styles={{
        indicatorSeparator: () => { },
    }}
/> */}