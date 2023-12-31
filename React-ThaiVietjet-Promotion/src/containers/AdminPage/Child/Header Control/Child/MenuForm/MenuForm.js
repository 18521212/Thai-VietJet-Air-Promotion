import { Component } from "react";
import './MenuForm.scss';
import _, { replace } from 'lodash';
import Select from 'react-select';
import { getAllMenuItemByMenuId } from "services/userService";
import { connect } from 'react-redux'
import * as actions from 'store/actions';
import CreateMenu from "./children/CreateMenu/CreateMenu";
import MenuSelect from "./children/MenuSelect/MenuSelect";
import CreateMenuItem from "./children/CreateMenuItem/CreateMenuItem";
import MenuItemSelect from "./children/MenuItemSelect/MenuItemSelect";
import SubMenuSelect from "./children/SubMenuSelect/SubMenuSelect";
import SubMenuForm from "./children/SubMenuForm/SubMenuForm";
import withRouter from "components/withRouter/withRouter";

import {
    Routes,
    Route,
} from "react-router-dom";

class MenuForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColorHEX: '',

            optionView: [
                { value: 1, label: 'View detail' },
                { value: 2, label: 'View Menu Item only' },
            ],
            selectedView: { value: 2, label: 'View Menu Item only' },
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        // option menu
        // if (prevProps.listMenu !== this.props.listMenu) {
        //     this.buildDataAndMapState()
        // }
        if (prevProps.location !== this.props.location) {
            if (this.props.location.pathname === "/admin/header") {
                this.setState({
                    selectedMenu: null
                })
            }
        }
    }

    setParentState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleOnChangeColor = () => {

    }

    render() {
        let { menuItem } = this.state;
        return (
            <>
                <div className="container-fluid">
                    <h3>Menu Section</h3>
                    <hr></hr>
                    <Routes>
                        <Route path="*" element={<MenuSelect selectedMenu={this.state.selectedMenu} optionMenu={this.state.optionMenu}
                            handleOnChangeSelect={this.handleOnChangeSelect} />} />
                        <Route path="menu-create/:type?" element={<CreateMenu />} />
                        <Route path="menu-item-select" element={<MenuItemSelect />} />
                        <Route path="menu-item-create/:type?" element={<CreateMenuItem />} />
                        <Route path="sub-menu-select" element={<SubMenuSelect />} />
                        <Route path="sub-menu-form/:type?" element={<SubMenuForm />} />
                    </Routes>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuData: state.admin.menus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMenu: () => dispatch(actions.fetchMenu())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuForm));