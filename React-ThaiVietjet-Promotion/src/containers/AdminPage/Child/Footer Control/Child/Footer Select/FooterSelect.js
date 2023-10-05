import { Component } from "react";
import './FooterSelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table"
import { func, api } from 'utils'
import { deleteFooter } from "services/userService";

class FooterSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.loadFooter()
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleCreate = () => {
        func.NAV(this, '../footer-form')
    }

    handleUpdate = (data) => {
        func.NAV(this, '../footer-form/update', { footer: data })
    }

    handleDelete = (data) => {
        func.HANDLE_DELETE('Delete this Footer?', data, deleteFooter, this.props.loadFooter)
    }

    render() {
        let { footers } = this.props
        return (
            <>
                <h4>Footer Select</h4>
                <div className="row my-1 px-3">
                    <button className="btn btn-success ml-auto"
                        onClick={() => this.handleCreate()}>Create</button>
                </div>
                <Table
                    data={footers.data}
                    thead={['Id', 'Name']}
                    tbody={['id', 'name']}
                    actions={(data) =>
                        <>
                            {data.footer_text ?
                                <button type="button" className="btn btn-success mx-1"
                                    onClick={() => func.NAV(this, '../footer-text-select', { footer: data })}>View Text</button>
                                :
                                <button type="button" className="btn btn-success mx-1"
                                    onClick={() => func.NAV(this, '../footer-text-form', { footer: data })}>Add Text</button>
                            }
                            <button type="button" className="btn btn-warning mx-1"
                                onClick={() => this.handleUpdate(data)}>Update</button>
                            <button type="button" className="btn btn-danger mx-1"
                                onClick={() => this.handleDelete(data)}>Delete</button>
                        </>
                    }
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        footers: state.admin.footers,
        footerOption: state.admin.footerOption
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // loadFooterText: (footerId) => dispatch(actions.fetchFooterText(footerId))
        loadFooter: () => dispatch(actions.fetchFooter())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterSelect));