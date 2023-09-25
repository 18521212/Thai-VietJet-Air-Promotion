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
        // console.log('update')
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
                    <h3>Menu Form</h3>
                    {/* <div className="row"> */}
                    {/* <CreateMenuItem /> */}
                    <Routes>
                        <Route path="*" element={<MenuSelect selectedMenu={this.state.selectedMenu} optionMenu={this.state.optionMenu}
                            handleOnChangeSelect={this.handleOnChangeSelect} />} />
                        <Route path="menu-create/:type?" element={<CreateMenu />} />
                        <Route path="menu-item-select" element={<MenuItemSelect />} />
                        <Route path="/menu-item-create/:type?" element={<CreateMenuItem />} />
                        <Route path="/sub-menu-select" element={<SubMenuSelect />} />
                        <Route path="/sub-menu-form/:type?" element={<SubMenuForm />} />
                    </Routes>

                    {/* {this.state.selectedMenu &&
                        <MenuItemSelect menuItem={menuItem} setParentState={this.setParentState} />
                    } */}

                    {/* {this.state.selectedView.value === 1 && menuItem && menuItem.length > 0 && menuItem.map((item, index) => {
                                return (
                                    <>
                                        <table className="table table-menu col-12" key={index}>
                                            <thead
                                            // className="thead-light"
                                            >
                                                <tr className="table-success"><th colspan="6">Menu Item: {item.textDataMenu_Item.valueEn}</th></tr>
                                                <tr className="table-active">
                                                    <th scope="col">id</th>
                                                    <th scope="col">text</th>
                                                    <th scope="col">link</th>
                                                    <th scope="col">order</th>
                                                    <th scope="col">highlight </th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td scope="row">{item.id}</td>
                                                    <td>{item.textDataMenu_Item.valueEn}</td>
                                                    <td>{item.link}</td>
                                                    <td>{item.order}</td>
                                                    <td>{item.highLight}</td>
                                                    <td>Actions</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {item.Sub_Menus.length > 0 &&
                                            <table className="table table-sub-menu col-12">
                                                <thead
                                                // className="thead-light"
                                                >
                                                    <tr className="table-danger">
                                                        <th colSpan={4}>Sub Menu of Menu Item: {item.textDataMenu_Item.valueEn}</th>
                                                    </tr>
                                                    <tr className="table-active">
                                                        <th scope="col">id menu item</th>
                                                        <th scope="col">text</th>
                                                        <th scope="col">link</th>
                                                        <th scope="col">order</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.Sub_Menus.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td scope="row">{item.menuParentId}</td>
                                                                <td>{item.textDataSub_Menu.valueEn}</td>
                                                                <td>{item.link}</td>
                                                                <td>{item.order}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        }
                                    </>
                                )
                            })}

                            {this.state.selectedView.value === 2 && menuItem &&
                                <table className="table table-menu-item-only col-12">
                                    <thead>
                                        <tr className="table-success"><th colspan="6">Menu Item</th></tr>
                                        <tr className="table-active">
                                            <th scope="col">id</th>
                                            <th scope="col">text</th>
                                            <th scope="col">link</th>
                                            <th scope="col">order</th>
                                            <th scope="col">highlight </th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menuItem && menuItem.length > 0 && menuItem.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td scope="row">{item.id}</td>
                                                    <td>{item.textDataMenu_Item.valueEn}</td>
                                                    <td>{item.link}</td>
                                                    <td>{item.order}</td>
                                                    <td>{item.highLight}</td>
                                                    <td>Actions</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td colSpan={100}>
                                                <input value='+ Add New' type="button" class="btn btn-success"
                                                    onClick={() => this.toggle('isShowMenuItemForm')}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            } */}
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