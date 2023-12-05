import { Component } from "react";
import './HeaderSelect.scss'
import _ from 'lodash';
import withRouter from "components/withRouter/withRouter";
import { connect } from 'react-redux'
import * as actions from 'store/actions';
import { deleteHeader } from "services/headerService";
import { toast } from 'react-toastify'
import Table from "components/Table/Table";

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
            let res = await deleteHeader({ id: headerId })
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
                <h3>Headers</h3>
                <div className="row px-3 my-1">
                    <input value='+ Add New' type="button" className="btn btn-success ml-auto"
                        onClick={() => this.directCreateHeader()}
                    />
                </div>
                <Table
                    data={listHeader}
                    thead={['Id', 'Logo Image', 'Background Image', 'Menu Id']}
                    tbody={['id', { name: 'imageLogo', type: 'image' }, { name: 'imageBackground', type: 'image' }, 'menuId']}
                    actions={(data) =>
                        <>
                            <input value='Update' type="button" className="btn btn-warning mx-1"
                                onClick={() => this.directCreateHeader('update', data)}
                            />
                            <input value='Delete' type="button" className="btn btn-danger mx-1"
                                onClick={() => this.handleDeleteHeader(data.id)}
                            />
                        </>
                    }
                />
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