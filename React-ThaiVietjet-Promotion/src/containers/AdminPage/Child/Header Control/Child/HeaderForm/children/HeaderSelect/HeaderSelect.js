import { Component } from "react";
import './HeaderSelect.scss'
import _ from 'lodash';
import withRouter from "components/withRouter/withRouter";
import { connect } from 'react-redux'
import * as actions from 'store/actions';
import { deleteHeader } from "services/userService";
import { toast } from 'react-toastify'

class HeaderSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageLogo: '',
            imageBackground: '',
        }
    }

    componentDidMount() {
        this.props.loadHeader()
    }

    handleDeleteHeader = async (headerId) => {
        if (window.confirm('Are you sure you wish to delete this item?') === true) {
            let res = await deleteHeader(headerId)
            res.errCode === 0 && this.props.loadHeader()
            res.errCode === 0 ? toast.success(res.errMessage) : toast.error(res.errMessage)
        } else {
            return;
        }
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    directCreateHeader = (type = null, header) => {
        switch (type) {
            case null:
                this.setParentState('isUpdate', false)
                this.props.setParentState('selectedPageHeader', this.props.pageHeader[2])
                break;
            case 'update':
                this.setParentState('isUpdate', true)
                this.setParentState('selectedHeader', header)
                this.props.setParentState('selectedPageHeader', this.props.pageHeader[2])
                break;
            default:
                this.props.setParentState('selectedPageHeader', this.props.pageHeader[2])
        }
    }

    setParentState = (name, value) => {
        this.props.setParentState(name, value)
    }

    render() {
        let listHeader = this.props.headerData.data
        return (
            <>
                <div className="row px-3 my-1">
                    <input value='+ Add New' type="button" className="btn btn-success ml-auto"
                        onClick={() => this.directCreateHeader()}
                    />
                </div>
                <table className="table table-header">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">id</th>
                            <th scope="col">Logo Image</th>
                            <th scope="col">Background Image</th>
                            <th scope="col">Menu Id</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listHeader && listHeader.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td><img src={item.imageLogo} /></td>
                                    <td><img src={item.imageBackground} /></td>
                                    <td>{item.menuId ? item.menuId : '*'}</td>
                                    <td>
                                        <input value='Update' type="button" className="btn btn-warning mx-1"
                                            onClick={() => this.directCreateHeader('update', item)}
                                        />
                                        <input value='Delete' type="button" className="btn btn-danger mx-1"
                                            onClick={() => this.handleDeleteHeader(item.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        headerData: state.admin.headers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadHeader: () => dispatch(actions.fetchHeader())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSelect));