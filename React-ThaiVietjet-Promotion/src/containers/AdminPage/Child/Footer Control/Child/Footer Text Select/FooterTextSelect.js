import { Component } from "react";
import './FooterTextSelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table"
import { func, api } from 'utils'
import { deleteFooterText } from "services/userService";

class FooterTextSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.loadFooterText(this.props.location.state.footer.id)
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleCreate = () => {
        func.NAV(this, '../footer-text-form', { footer: this.props.location.state.footer })
    }

    handleUpdate = (data) => {
        func.NAV(this, '../footer-text-form/update', { footer_text: data })
    }

    handleDelete = (data) => {
        let footerId = this.props.location.state.footer.id
        func.HANDLE_DELETE('Delete this Footer?', data, deleteFooterText, () => { this.props.loadFooterText(footerId) })
    }

    render() {
        let { footer_texts } = this.props
        return (
            <>
                <div className="row my-1 px-3">
                    <button className="btn btn-primary mr-auto"
                        onClick={() => func.NAV(this, -1)}>Back</button>
                    <button className="btn btn-success ml-auto"
                        onClick={() => this.handleCreate()}>Create</button>
                </div>
                <Table
                    data={footer_texts.data}
                    thead={['Id', 'Title', 'Link']}
                    tbody={['id', 'title', 'link']}
                    actions={(data) =>
                        <>
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
        footer_texts: state.admin.footer_texts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadFooterText: (footerId) => dispatch(actions.fetchFooterText(footerId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterTextSelect));