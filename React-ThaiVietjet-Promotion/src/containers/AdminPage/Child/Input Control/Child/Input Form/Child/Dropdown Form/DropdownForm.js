import { Component } from "react";
import './DropdownForm.scss'
import _, { drop } from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import Select from 'react-select';
import Table from "components/Table/Table";
import { v4 as uuidv4 } from 'uuid';
import {
    createDropdown, updateDropdown,
    createDataDropdown, deleteDataDropdown
} from "services/formService";

class DropdownForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: { value: null, label: 'Text' },
            optionType: [
                { value: null, label: 'Text' },
                { value: 'email', label: 'Email' },
            ],
        }
    }

    componentDidMount() {
        this.mapStateRoute()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.type !== this.props.params.type) {
            this.mapStateRoute()
        }
    }

    mapStateRoute = () => {
        func.MAP_STATE_ROUTE(this,
            {},
            {
                object: 'input',
                property: [
                    { key1: 'id', key2: ['dropdown', 'id'] },
                    { key1: 'titleEn', key2: ['dropdown', 'titleDataDropdown', 'valueEn'] },
                    { key1: 'titleTh', key2: ['dropdown', 'titleDataDropdown', 'valueTh'] },
                ]
            }
        )
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    clearDataDropdownForm=()=>{
        this.setState({
            value: '',
            label: ''
        })
    }

    onSubmit = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            ['titleEn', 'titleTh'],
            {
                func: createDropdown,
                callBack: async (res) => {
                    await this.props.loadInput(res.data.id)
                    let input = this.props.input
                    func.NAV(this, '../dropdown/update', { input: input.data })
                }
            },
            {
                func: updateDropdown,
                property: ['id'],
                callBack: () => { func.NAV(this, -1) }
            }
        )
    }

    onAddData = () => {
        let oldInput = this.props.location.state?.input
        let data = {
            value: this.state.value,
            label: this.state.label,
            dropdownId: oldInput?.dropdown.id
        }
        console.log('data', data)
        func.HANDLE_CREATE_UPDATE(data, createDataDropdown,
            async () => {
                await this.props.loadInput(oldInput.id)
                let input = this.props.input
                this.clearDataDropdownForm()
                func.NAV(this, '../dropdown/update', { input: input.data })
            })
    }

    onDeleteData = (data) => {
        let oldInput = this.props.location.state?.input
        func.HANDLE_DELETE('Delete this item?', { id: data.id }, deleteDataDropdown,
            async () => {
                await this.props.loadInput(oldInput.id)
                let input = this.props.input
                func.NAV(this, '../dropdown/update', { input: input.data })
            })
    }

    render() {
        let type = this.props.params?.type
        let input = this.props.location.state?.input
        return (
            <>
                <h3>Dropdown Form</h3>
                <div className="row">
                    {input?.dropdown?.id &&
                        <>
                            <div className="form-group col-md-4">
                                <label for="id">{'Id (Dropdown Id)'}</label>
                                <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                    value={this.state.id} disabled
                                    onChange={(event) => func.ONCHANGE_TEXT(this, 'id', event)}
                                />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div className="form-group col-md-4">
                        <label for="id">Title English</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.titleEn}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'titleEn', event)}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="id">Title Thai</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.titleTh}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'titleTh', event)}
                        />
                    </div>
                    <div className="w-100"></div>
                </div>
                {input && input?.dropdown?.dataDropdown.length > 0 &&
                    <div className="row">
                        <div className="col-md-12">
                            <Table
                                data={input?.dropdown?.dataDropdown}
                                thead={['Id', 'Value', 'Label']}
                                tbody={['id', 'value', 'label']}
                                actions={(data) =>
                                    <>
                                        <button type="button" className="btn btn-danger mx-1"
                                            onClick={() => this.onDeleteData(data)}>Delete</button>
                                    </>
                                }
                            />
                        </div>
                    </div>
                }
                {type === 'update' &&
                    <div className="row">
                        <div className="form-group col-md-4">
                            <label for="id">Value</label>
                            <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                value={this.state.value}
                                onChange={(event) => func.ONCHANGE_TEXT(this, 'value', event)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="id">Label</label>
                            <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                value={this.state.label}
                                onChange={(event) => func.ONCHANGE_TEXT(this, 'label', event)}
                            />
                        </div>
                        <div className="form-group d-flex align-items-end">
                            <button className="btn btn-primary form-control"
                                onClick={() => this.onAddData()}
                            >Add</button>
                        </div>
                        <div className="w-100"></div>
                    </div>
                }
                <div className="row px-3">
                    {component.BUTTON_SUBMIT(this, () => { this.onSubmit() }, 'mr-2')}
                    <button
                        className="btn btn-dark"
                        onClick={() => func.NAV(this, '../../input')}
                    >Cancel</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        input: state.admin.input
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadInput: (id) => dispatch(actions.fetchInput(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DropdownForm));