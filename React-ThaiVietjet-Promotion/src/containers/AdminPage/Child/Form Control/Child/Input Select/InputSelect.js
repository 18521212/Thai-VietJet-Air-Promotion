import { Component } from "react";
import './InputSelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table"
import { func } from 'utils'
import { deleteFormDetail } from "services";

class InputSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.loadFormDetail()
    }

    loadFormDetail = () => {
        this.props.loadFormDetail(this.props.location.state.form.id)
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleDelete = (data) => {
        func.HANDLE_DELETE('Delete this Input association from Form Detail?',
            data, deleteFormDetail, () => { this.loadFormDetail() }
        )
    }

    render() {
        let inputs = this.props?.inputs
        let inputData = inputs.data
        inputData && inputData.map((item) => {
            if (item.input.text_input) {
                item.title = item.input.text_input.titleDataText_Input.valueEn
            } else if (item.input.dropdown) {
                item.title = item.input.dropdown.titleDataDropdown.valueEn
            }
        })
        return (
            <>
                <h3>Input Select</h3>
                <div className="row my-1 px-3">
                    <button className="btn btn-primary mr-auto"
                        onClick={() => func.NAV(this, -1)}
                        title="Back to previous side"
                    >Back</button>
                    <button className="btn btn-success ml-auto"
                        onClick={() => func.NAV(this, '../form-detail', { form: this.props.location.state.form })}
                        title="Add existed Input association to Form Detail"
                    >Add Input</button>
                </div>
                <Table
                    data={inputData}
                    thead={['Id', 'Input Id', 'Order', 'Width (Medium screen size)', 'Input Type', 'title']}
                    tbody={['id', 'inputId', 'order', 'widthMdScreen',
                        { key1: 'input', key2: 'typeInput', type: 'object' },
                        'title'
                    ]}
                    actions={(data) =>
                        <>
                            <button type="button" className="btn btn-primary mx-1"
                                onClick={() => func.NAV(this, '../../input/input-detail',
                                    { input: data?.input })}
                                title="Redirect view detail input"
                            >View</button>
                            <button type="button" className="btn btn-warning mx-1"
                                onClick={() => func.NAV(this, '../form-detail/update', { formDetail: data })}
                                title="Redirect update input"
                            >Update Form</button>
                            <button type="button" className="btn btn-danger mx-1"
                                onClick={() => this.handleDelete(data)}
                                title="Delete Input associate with Form Detail"
                            >Delete</button>
                        </>
                    }
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        inputs: state.admin.form_detail_by_forms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadFormDetail: (id) => dispatch(actions.fetchFormDetailByFormId(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputSelect));