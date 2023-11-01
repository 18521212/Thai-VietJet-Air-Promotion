import { Component } from "react";
import './FormDetail.scss'
import _, { isPlainObject } from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func } from 'utils'
import Select from "components/Select/Select";
import RenderInput from "components/Render Input/RenderInput";
import { createFormDetail, updateFormDetail } from "services/formService";

class FormDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formId: '',
            selectedInput: '',
            order: '',
            widthMdScreen: '',
        }
    }

    componentDidMount() {
        this.props.loadInput()
        this.mapData()
    }

    mapData = () => {
        func.MAP_STATE_ROUTE(this,
            { object: 'form', property: [{ key1: 'formId', key2: 'id' }] },
            { object: 'formDetail', property: ['id', 'formId', 'order', 'widthMdScreen'] })
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleCreate = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            ['formId', { key: 'inputId', property: ['selectedInput', 'value', 'id'] }, 'order', 'widthMdScreen'],
            {
                func: createFormDetail,
                callBack: () => { func.NAV(this, -1) }
            },
            {
                func: updateFormDetail,
                property: ['id', 'order', 'widthMdScreen', 'inputId'],
                callBack: () => { func.NAV(this, -1) }
            })
    }

    render() {
        let type = this.props.params?.type
        return (
            <>
                <h4>Form Detail</h4>
                <div className="row">
                    <div class="form-group col-md-2">
                        <label for="id">Form Id</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.formId} disabled
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'title', event)}
                        />
                    </div>
                    {this.state.id &&
                        <div class="form-group col-md-2">
                            <label for="id">Id</label>
                            <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                value={this.state?.id} disabled
                                onChange={(event) => func.ONCHANGE_TEXT(this, 'id', event)}
                            />
                        </div>
                    }
                    <div class="form-group col-md-2">
                        <label for="id">Order</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.order}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'order', event)}
                        />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="id">{'Width (Medium screen)'}</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.widthMdScreen}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'widthMdScreen', event)}
                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label for="id">Input Id</label>
                        <Select
                            value='selectedInput'
                            options='inputOption'
                            parent={this}
                        />
                    </div>
                    <div className="w-100"></div>
                    {this.state.selectedInput &&
                        <div class="form-group col">
                            <label for="id">Selected Input Demo</label>
                            <RenderInput data={this.state.selectedInput?.value} />
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col">
                        <button type="button"
                            className={`btn ${type === 'update' ?
                                'btn-warning' : 'btn-success'} mr-1`}
                            onClick={() => this.handleCreate()}
                        >
                            {type === 'update' ? 'Save' : 'Submit'}
                        </button>
                        <button type="button" className="btn btn-secondary mx-1"
                            onClick={() => this.handleNav(-1)}>Cancel</button>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        inputs: state.admin.inputs,
        inputOption: state.admin.inputOption,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadInput: () => dispatch(actions.fetchInput())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormDetail));