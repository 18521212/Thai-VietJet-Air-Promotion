import { Component } from "react";
import './FormSelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table"
import { func, api } from 'utils'
import { deleteForm } from "services/formService";

class FormSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.loadForm()
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleUpdate = (data) => {
        func.NAV(this, '../form-manage/update', { form: data })
    }

    handleDelete = (data) => {
        func.HANDLE_DELETE('Delete this Form?', data, deleteForm, () => { this.props.loadForm() })
    }

    render() {
        let { forms } = this.props
        return (
            <>
                <h3>Forms</h3>
                <div className="row my-1 px-3">
                    <button className="btn btn-success ml-auto"
                        onClick={() => func.NAV(this, '../form-manage')}>Create</button>
                </div>
                <Table
                    data={forms.data}
                    thead={['Id', 'Name']}
                    tbody={['id', 'name']}
                    actions={(data) =>
                        <>
                            {data.form_detail.length > 0 ?
                                <button type="button" className="btn btn-primary mx-1"
                                    onClick={() => func.NAV(this, '../input-select', { form: data })}>View Input</button>
                                :
                                <button type="button" className="btn btn-success mx-1"
                                    onClick={() => func.NAV(this, '../form-detail', { form: data })}>Add Input</button>
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
        forms: state.admin.forms,
        formOption: state.admin.formOption,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadForm: (id) => dispatch(actions.fetchForm(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormSelect));