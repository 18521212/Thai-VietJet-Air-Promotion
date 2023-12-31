import { Component } from "react";
import './HeaderControl.scss'
import Select from 'react-select';
import _ from 'lodash';
import {
    getHeader, createHeader, deleteHeader,
    getAllMenu
} from "../../../../services/userService";
import { event } from "jquery";
import HeaderForm from "./Child/HeaderForm/HeaderForm";
import MenuForm from "./Child/MenuForm/MenuForm";
import {
    Routes,
    Route,
} from "react-router-dom";

class HeaderControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMenu: ''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="header-control">
                <HeaderForm listMenu={this.state.listMenu} />
                <MenuForm />
            </div>
        )
    }
}

export default HeaderControl;