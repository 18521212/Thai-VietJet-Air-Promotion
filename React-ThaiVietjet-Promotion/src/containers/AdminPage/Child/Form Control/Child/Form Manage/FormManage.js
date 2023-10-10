import { Component } from "react";
import './FormManage.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { createForm, updateForm } from "services/userService";
import { func } from 'utils'

class FormManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
        }
    }

    componentDidMount() {
        this.mapStateUpdate()
    }

    mapStateUpdate = () => {
        let { type } = this.props.params
        if (type === 'update') {
            func.MAP_STATE_UPDATE(this, this.props.location.state.form)
        } else {
            // let dataFooter = this.props.location.state.form
            // dataFooter.footerId = dataFooter.id
            // delete dataFooter.id
            // func.MAP_STATE_UPDATE(this, dataFooter)
        }
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleCreate = async () => {
        let { type } = this.props.params
        let { name, id } = this.state
        let data = {}, res
        data.name = name
        if (type === 'update') {
            data.id = id
            func.HANDLE_CREATE_UPDATE(data, updateForm, () => { this.handleNav(-1) })
        } else {
            func.HANDLE_CREATE_UPDATE(data, createForm, () => { this.handleNav(-1) })
        }
    }

    render() {
        let type = this.props.params?.type
        console.log('st', this.state)
        return (
            <>
                <h4>Footer Form</h4>
                <div className="row">
                    {type === 'update' &&
                        <div class="form-group col-2">
                            <label for="id">Id</label>
                            <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                value={this.state.id} disabled
                                onChange={(event) => func.ONCHANGE_TEXT(this, 'id', event)}
                            />
                        </div>
                    }
                    <div class="form-group col-4">
                        <label for="id">Name</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.name}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'name', event)}
                        />
                    </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // funcReact: () => dispatch(actions.funcRedux())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormManage));