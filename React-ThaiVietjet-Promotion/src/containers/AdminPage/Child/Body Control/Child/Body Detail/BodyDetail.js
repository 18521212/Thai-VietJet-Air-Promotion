import { Component } from "react";
import './BodyDetail.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func } from 'utils'

class BodyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentEn: '',
            contentTh: '',
        }
    }

    componentDidMount() {
        this.mapData()
    }

    mapData = () => {
        let body = this.props?.location?.state?.body
        body && func.MAP_STATE_UPDATE(this, body)
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        return (
            <>
                <h3>Body Detail </h3>
                <div className="row mb-2 px-3">
                    <button className="btn btn-primary mr-auto"
                        onClick={() => func.NAV(this, -1)}>Back</button>
                    <button className="btn btn-warning ml-auto"
                        onClick={() => func.NAV(this, '../body-form/update', { body: this.props.location.state.body })}
                    >
                        Update</button>
                </div >
                <div className="row">
                    <div className="form-group col-md-4">
                        <label for="exampleInputEmail1">Name</label>
                        <input className="form-control" value={this.state.name}
                            onChange={(e) => func.ONCHANGE_TEXT(this, 'name', e)} type='text' disabled />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label for="contentEn">Content English</label>
                        <div className="content-power-pack border rounded p-3"
                            id='contentEn'
                            dangerouslySetInnerHTML={{ __html: this.state.contentEn }}
                        >
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="contentEn">Content Thai</label>
                        <div className="content-power-pack border rounded p-3"
                            dangerouslySetInnerHTML={{ __html: this.state.contentTh }}
                        >
                        </div>
                    </div>
                </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BodyDetail));