import { Component } from "react";
import './MenuItemSelect.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
// import withRouter from "../../../../../../../../components/withRouter/withRouter";
import withRouter from "components/withRouter/withRouter";
import { getAllMenuItemByMenuId, deleteMenuItem } from "services/userService";

class MenuItemSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: ''
        }
    }

    componentDidMount() {
        // console.log('props:', this.props)
        this.getAllMenuItemByMenuId()
    }

    getAllMenuItemByMenuId = async () => {
        let id = this.props.location.state ? this.props.location.state.menuId : '';
        let menuItem = await getAllMenuItemByMenuId(id)
        menuItem = menuItem.data.sort((a, b) => a.order - b.order);
        this.setState({ menuItem: menuItem })
    }

    handleNavigate = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleDelete = async (id) => {
        if (window.confirm('Are you sure you wish to delete this Menu Item?') === true) {
            let res = await deleteMenuItem({ id: id })
            res.errCode === 0 ? toast.success(res.errMessage) : toast.error(res.errMessage)
            if (res.errCode === 0) {
                this.getAllMenuItemByMenuId()
            }
        } else {
            return;
        }
    }

    render() {
        return (
            <>
                <div className="row px-3 my-1">
                    <button className="btn btn-primary mr-auto" onClick={() => this.handleNavigate(-1)}>Back</button>
                    <div className="bg-danger text-white col-1">menu</div>
                    <div className="bg-success text-white col-2">menu item</div>
                    <button className="btn btn-success ml-auto" onClick={() => this.handleNavigate('../menu-item-create', { menuId: this.props.location.state.menuId })}>+ Add new</button>
                </div>
                {this.state.menuItem &&
                    <table className="table table-menu col-12 table-striped">
                        <thead
                        // className="thead-light"
                        >
                            <tr className="table-success">
                                <th scope="col">Id</th>
                                <th scope="col">English Text</th>
                                <th scope="col">Thai Text</th>
                                <th scope="col">Link</th>
                                <th scope="col">Order</th>
                                <th scope="col">Highlight </th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.menuItem && this.state.menuItem.map((item, index) => {
                                // console.log(item)
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.textDataMenu_Item.valueEn}</td>
                                            <td>{item.textDataMenu_Item.valueTh}</td>
                                            <td>{item.link}</td>
                                            <td>{item.order}</td>
                                            <td>{item.highlight}</td>
                                            <td>
                                                {item.Sub_Menus.length > 0 ?
                                                    <>
                                                        <button className="btn btn-success mx-1" onClick={() => this.handleNavigate('../sub-menu-select', { SubMenus: item.Sub_Menus, menuParentId: item.id })}>Sub Menu</button>
                                                        <button className="btn btn-warning mx-1" onClick={() => this.handleNavigate('../menu-item-create/update', { menuItem: item, menuId: this.props.location.state.menuId })}>Update</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button className="btn btn-info mx-1" onClick={() => this.handleNavigate('../sub-menu-form', { menuParentId: item.id })}>+ Add Sub Menu</button>
                                                        <button className="btn btn-warning mx-1" onClick={() => this.handleNavigate('../menu-item-create/update', { menuItem: item, menuId: this.props.location.state.menuId })}>Update</button>
                                                        <button className="btn btn-danger mx-1" onClick={() => this.handleDelete(item.id)}>Delete</button>
                                                    </>}
                                            </td>
                                        </tr>

                                    </>
                                )
                            })}
                        </tbody>
                    </table >
                }
            </>
        )
    }
}

export default withRouter(MenuItemSelect);