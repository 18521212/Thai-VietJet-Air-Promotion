import { Component } from "react";
import './SubMenuSelect.scss'
import _, { conforms } from 'lodash';
import withRouter from "components/withRouter/withRouter";
import { connect } from 'react-redux'
import * as actions from 'store/actions';
import { deleteSubMenu } from "services/userService";
import { toast } from 'react-toastify';

class SubMenuSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.fetchSubMenuFromRedux()
    }

    fetchSubMenuFromRedux = () => {
        this.props.fetchSubMenu(this.props.location.state.menuParentId)
    }

    handleNavigate = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleDelete = async (id) => {
        if (window.confirm('Are you sure to delete this Sub Menu?') === true) {
            let res = await deleteSubMenu({ id: id })
            res.errCode === 0 ? toast.success(res.errMessage) : toast.error(res.errMessage)
            if (res.errCode === 0) {
                this.fetchSubMenuFromRedux()
            }
        } else {
            return;
        }
    }

    render() {
        let { menuParentId } = this.props.location.state
        let SubMenus = this.props.subMenuData.data;
        return (
            <>
                <div className="row px-3 my-1">
                    <button className="btn btn-primary mr-auto" onClick={() => this.handleNavigate(-1)}>Back</button>
                    <div className="bg-danger text-white col-1">menu</div>
                    <div className="bg-success text-white col-1">menu item</div>
                    <div className="bg-info text-white col-2">sub menu</div>
                    <button className="btn btn-success ml-auto" onClick={() => this.handleNavigate("../sub-menu-form", { menuParentId: menuParentId })}>+ Add new</button>
                </div>
                {SubMenus &&
                    <table className="table table-sub-menu col-12 table-striped">
                        <thead
                        // className="thead-light"
                        >
                            <tr className="table-info">
                                <th scope="col">Id</th>
                                <th scope="col">English Text</th>
                                <th scope="col">Thai Text</th>
                                <th scope="col">Link</th>
                                <th scope="col">Order</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SubMenus.map((item, index) => {
                                return (
                                    <tr>
                                        <td scope="row">{item.id}</td>
                                        <td>{item.textDataSub_Menu.valueEn}</td>
                                        <td>{item.textDataSub_Menu.valueTh}</td>
                                        <td>{item.link}</td>
                                        <td>{item.order}</td>
                                        <td>
                                            <button className="btn btn-warning mx-1" onClick={() => this.handleNavigate('../sub-menu-form/update', { subMenu: item, menuParentId: menuParentId })}>Update</button>
                                            <button className="btn btn-danger mx-1" onClick={() => this.handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        subMenuData: state.admin.subMenus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSubMenu: (menuParentId) => dispatch(actions.fetchSubMenu(menuParentId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubMenuSelect));