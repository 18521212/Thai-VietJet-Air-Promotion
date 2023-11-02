import { Component } from "react";
import './BannerForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import { createBanner, updateBanner } from "services/bannerService";

class BannerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageMobile: '',
            imageDesktop: '',

            imagePreview: '',
            isOpen: true
        }
    }

    componentDidMount() {
        this.mapDataUpdate()
    }

    mapDataUpdate = () => {
        func.MAP_STATE_ROUTE(this, {}, {
            object: 'banner',
            property: ['id']
        })
        let { type } = this.props.params
        if (type === 'update') {
            let { banner } = this.props.location.state
            this.setState({
                name: banner.name,
                imageMobile: banner.imageMobile,
                imageDesktop: banner.imageDesktop
            })
        }
    }

    handleOnChangeText = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleSave = async () => {
        let { type } = this.props.params
        let { name, imageDesktop, imageMobile } = this.state
        let data = {}, res
        if (type === 'update') {
            let { banner } = this.props.location.state
            data.id = banner.id
            data.name = name
            data.imageDesktop = imageDesktop
            data.imageMobile = imageMobile
            res = await updateBanner(data)
        } else {
            data.name = name
            data.imageDesktop = imageDesktop
            data.imageMobile = imageMobile
            res = await createBanner(data)
        }
        func.ALERT_RES(res) && this.handleNav(-1)
    }

    render() {
        let { type } = this.props.params
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Banner</h3>
                <form className="row">
                    {type === 'update' &&
                        <>
                            <div className="form-group col-md-2">
                                <label for="exampleInputEmail1">Banner Id</label>
                                <input className="form-control" value={this.state?.id}
                                    type='text' disabled />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div className="form-group col-md-4">
                        <label for="exampleInputEmail1">Name</label>
                        <input className="form-control" value={this.state.name}
                            onChange={(e) => func.ONCHANGE_TEXT(this, 'name', e)} type='text' />
                    </div>
                    <div className="w-100"></div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Image Mobile</label>
                        <div class="custom-file">
                            <input type="file" className="custom-file-input" id="validatedCustomFile"
                                onChange={(event) => func.ONCHANGE_IMAGE(this, 'imageMobile', event)}
                            />
                            <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                        </div>
                        <img src={this.state.imageMobile} />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Image Desktop</label>
                        <div class="custom-file">
                            <input type="file" className="custom-file-input" id="validatedCustomFile"
                                onChange={(event) => func.ONCHANGE_IMAGE(this, 'imageDesktop', event, 'imagePreview')}
                            />
                            <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                        </div>
                        <img src={this.state.imageDesktop} />
                    </div>
                    <div className="w-100"></div>
                    <div class="form-group col-md-6">
                        <button type="button"
                            className={`btn ${type === 'update' ?
                                'btn-warning' : 'btn-success'} mr-1`}
                            onClick={() => this.handleSave()}>
                            {type === 'update' ? 'Save' : 'Create'}</button>
                        <button type="button" className="btn btn-secondary mx-1"
                            onClick={() => this.handleNav(-1)}>Cancel</button>
                    </div>
                </form>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BannerForm));