import { Component } from "react";
import './HeaderControl.scss'
import Select from 'react-select';
import _ from 'lodash';
import {
    getAllHeader, createHeader, deleteHeader,
    getAllMenu
} from "../../../../services/userService";
import { event } from "jquery";
import HeaderForm from "../Header Control/Child/HeaderForm";
import MenuForm from "./Child/MenuForm";

class HeaderControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMenu: ''
        }
    }

    componentDidMount() {
        this.buildDataAndMapState()
    }

    buildDataAndMapState = async () => {
        let listMenu = await getAllMenu();
        this.setState({ listMenu: listMenu.data })
    }

    render() {
        return (
            <div className="header-control">
                <HeaderForm listMenu={this.state.listMenu} />
                <MenuForm listMenu={this.state.listMenu} />
            </div>
        )
    }
}

export default HeaderControl;