import { Component } from "react";
import './MenuItemSelect.scss'
import _ from 'lodash';
// import withRouter from "../../../../../../../../components/withRouter/withRouter";
import withRouter from "components/withRouter/withRouter";
import { getAllMenuItemByMenuId } from "services/userService";

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
        let id = this.props.menuId ? this.props.menuId : this.props.location.state.menuId
        console.log('id', id)
        let menuItem = await getAllMenuItemByMenuId(id)
        this.setState({ menuItem: menuItem.data })
    }

    handleNavigate = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        return (
            <>
                <div className="row px-3 my-1">
                    <button className="btn btn-primary mr-auto" onClick={() => this.handleNavigate(-1)}>Back</button>
                    <div className="bg-danger text-white col-1">menu</div>
                    <div className="bg-success text-white col-2">menu item</div>
                    <button className="btn btn-success ml-auto" onClick={() => this.handleNavigate('../menu-item-create')}>+ Add new</button>
                </div>
                <table className="table table-menu col-12 table-striped">
                    <thead
                    // className="thead-light"
                    >
                        <tr className="table-success">
                            <th scope="col">id</th>
                            <th scope="col">text</th>
                            <th scope="col">link</th>
                            <th scope="col">order</th>
                            <th scope="col">highlight </th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.menuItem && this.state.menuItem.map((item, index) => {
                            return (
                                <>
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.textDataMenu_Item.valueEn}</td>
                                        <td>{item.link}</td>
                                        <td>{item.order}</td>
                                        <td>{item.highLight}</td>
                                        <td>
                                            {item.Sub_Menus.length > 0 ?
                                                <button className="btn btn-success" onClick={() => this.handleNavigate('../sub-menu-select', { SubMenus: item.Sub_Menus })}>Sub Menu</button>
                                                :
                                                <>
                                                    <button className="btn btn-info" onClick={() => this.handleNavigate('../menu-item-create')}>+ Add Sub Menu</button>
                                                    <button className="btn btn-danger" onClick={() => this.handleNavigate(-1)}>Delete</button>
                                                </>}
                                        </td>
                                    </tr>

                                </>
                            )
                        })}
                    </tbody>
                </table >
            </>
        )
    }
}

export default withRouter(MenuItemSelect);