import { Component } from "react";
import './InputSelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table";
import { Link } from "react-router-dom";
import { deleteInput } from "services/formService";
import { func } from 'utils'

class InputSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.loadInput()
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onUpdate = (data) => {
        let typeInput = data.typeInput, link
        if (typeInput === 'text') {
            link = '../input-form/text/update'
        } else if (typeInput === 'dropdown') {
            link = '../input-form/dropdown/update'
        }
        if (link) func.NAV(this, link, { input: data })
    }

    onDelete = (data) => {
        func.HANDLE_DELETE('Delete this item?', { id: data.id }, deleteInput, () => { this.props.loadInput() })
    }

    render() {
        let inputs = this.props?.inputs
        let inputData = inputs.data
        inputData && inputData.map((item) => {
            if (item.text_input) {
                item.title = item.text_input.titleDataText_Input.valueEn
                item.inputChildId = item.text_input.id
            } else if (item.dropdown) {
                item.title = item.dropdown.titleDataDropdown.valueEn
                item.inputChildId = item.dropdown.id
            }
        })
        return (
            <>
                <h3>Input Select</h3>
                <div className="row px-3 mb-1">
                    <button className="btn btn-primary mr-auto">Back</button>
                    <div className="dropdown">
                        <button className="btn btn-success ml-auto dropdown-toggle"
                            data-toggle="dropdown"
                            type="button"
                        >Create Input</button>
                        <div class="dropdown-menu">
                            <Link className="nav-link" to='../input-form/text'>Text</Link>
                            <Link className="nav-link" to='../input-form/dropdown'>Dropdown</Link>
                        </div>
                    </div>
                </div>
                <Table
                    data={inputData}
                    thead={['Input Id', 'Id', 'Title']}
                    tbody={['id', 'inputChildId', 'title']}
                    actions={(data) =>
                        <>
                            <button type="button" className="btn btn-warning mx-1"
                                onClick={() => this.onUpdate(data)}
                            >Update</button>
                            <button type="button" className="btn btn-danger mx-1"
                                onClick={() => this.onDelete(data)}
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
        inputs: state.admin.inputs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadInput: (id) => dispatch(actions.fetchInput(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputSelect));