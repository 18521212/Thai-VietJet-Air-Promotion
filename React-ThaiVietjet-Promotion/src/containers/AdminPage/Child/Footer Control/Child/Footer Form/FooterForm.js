import { Component } from "react";
import './FooterForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { createFooter, updateFooter } from "services/footerService";
import { func, component } from 'utils'

class FooterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    componentDidMount() {
        this.mapStateUpdate()
    }

    mapStateUpdate = () => {
        func.MAP_STATE_ROUTE(this, {}, {
            object: 'footer',
            property: ['id']
        })
        func.MAP_STATE_UPDATE(this, this.props.location.state?.footer)
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleCreate = async () => {
        let { type } = this.props.params
        let { name } = this.state
        let data = {}, res
        data.name = name
        if (type === 'update') {
            let { footer } = this.props.location.state
            data.id = footer.id
            res = await updateFooter(data)
        } else {
            res = await createFooter(data)
        }
        func.ALERT_RES(res) && this.handleNav(-1)
    }

    render() {
        let type = this.props.params?.type
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Footer</h3>
                <div className="row">
                    {type === 'update' &&
                        <>
                            <div className="form-group col-md-2">
                                <label for="exampleInputEmail1">Footer Id</label>
                                <input className="form-control" value={this.state?.id}
                                    type='text' disabled />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div class="form-group col-4">
                        <label for="id">Name</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.name}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'name', event)}
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterForm));