import { Component } from "react";
import './FooterTextForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { createFooterText, updateFooterText } from "services/userService";
import { func } from 'utils'

class FooterTextForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            footerId: '',
            title: '',
            link: '',
        }
    }

    componentDidMount() {
        this.mapStateUpdate()
    }

    mapStateUpdate = () => {
        let { type } = this.props.params
        if (type === 'update') {
            func.MAP_STATE_UPDATE(this, this.props.location.state.footer_text)
        } else {
            let dataFooter = this.props.location.state.footer
            dataFooter.footerId = dataFooter.id
            delete dataFooter.id
            func.MAP_STATE_UPDATE(this, dataFooter)
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
        let { id, footerId, title, link } = this.state
        let data = {}, res
        data.footerId = footerId
        data.title = title
        data.link = link
        if (type === 'update') {
            data.id = id
            func.HANDLE_CREATE_UPDATE(data, updateFooterText, () => { this.handleNav(-1) })
        } else {
            func.HANDLE_CREATE_UPDATE(data, createFooterText, () => { this.handleNav(-1) })
        }
    }

    render() {
        let type = this.props.params?.type
        let idInputStatus = type === 'update' ? 'id' : 'footerId'
        console.log('st', this.state)
        return (
            <>
                <h4>Footer Form</h4>
                <div className="row">
                    <div class="form-group col-md-2">
                        <label for="id">
                            {type === 'update' ? 'Id' : 'Footer Id'}
                        </label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state[idInputStatus]}
                            disabled
                            onChange={(event) => func.ONCHANGE_TEXT(this, idInputStatus, event)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div class="form-group col-md-4">
                        <label for="id">Title</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.title}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'title', event)}
                        />
                    </div>
                    <div class="form-group col-md-5">
                        <label for="id">Link</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.link}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'link', event)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterTextForm));