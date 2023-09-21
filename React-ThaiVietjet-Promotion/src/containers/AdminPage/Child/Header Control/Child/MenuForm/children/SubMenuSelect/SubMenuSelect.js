import { Component } from "react";
import './SubMenuSelect.scss'
import _, { conforms } from 'lodash';
import withRouter from "components/withRouter/withRouter";

class SubMenuSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }

    handleNavigate = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        let { SubMenus, menuParentId } = this.props.location.state
        console.log(menuParentId)
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
                                <th scope="col">id</th>
                                <th scope="col">text</th>
                                <th scope="col">link</th>
                                <th scope="col">order</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SubMenus.map((item, index) => {
                                return (
                                    <tr>
                                        <td scope="row">{item.id}</td>
                                        <td>{item.textDataSub_Menu.valueEn}</td>
                                        <td>{item.link}</td>
                                        <td>{item.order}</td>
                                        <td>
                                            <button className="btn btn-warning mx-1" onClick={() => this.handleNavigate(-1)}>Update</button>
                                            <button className="btn btn-danger mx-1" onClick={() => this.handleNavigate(-1)}>Delete</button>
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

export default withRouter(SubMenuSelect);