import { Component } from "react";
// import './ImageBannerForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import { createImageBanner } from "services/bannerService";
import Select from "components/Select/Select";

let typeOption = [
    { value: 'mobile', label: 'Mobile' },
    { value: 'desktop', label: 'Desktop' },
]

class ImageBannerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            selectedType: typeOption[1],
            typeOption: typeOption
        }
    }

    componentDidMount() {
        this.mapData()
    }

    mapData = () => {
        func.MAP_STATE_ROUTE(this,
            {
                object: 'banner',
                property: ['id']
            },
            {})
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onSubmit = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            [{ key: 'bannerId', property: ['id'] }, 'image', { key: 'type', property: ['selectedType', 'value']}],
            {
                func: createImageBanner,
                callBack: () => { func.NAV(this, '../image-banner-list', { banner: this.props.location.state?.banner }) }
            },
            {

            })
    }

    render() {
        let { type } = this.props.params
        console.log('t', this.state.selectedType)
        return (
            <>
                <h3>Image Banner Form</h3>
                <form className="row">
                    <div class="form-group col-md-2">
                        <label>Banner Id</label>
                        <input className="form-control" value={this.state?.id}
                            type='text' disabled />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Image Mobile</label>
                        <div class="custom-file">
                            <input type="file" className="custom-file-input" id="validatedCustomFile"
                                onChange={(event) => func.ONCHANGE_IMAGE(this, 'image', event)}
                            />
                            <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                        </div>
                        <img src={this.state.image} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Type</label>
                        <Select
                            value='selectedType'
                            options='typeOption'
                            typeSelect='state'
                            parent={this}
                        />
                    </div>
                    <div className="w-100"></div>
                    <div class="form-group col-md-6">
                        {component.BUTTON_SUBMIT(this, this.onSubmit)}
                        <button type="button" className="btn btn-dark mx-1"
                            onClick={() => this.handleNav(-1)}
                        >Cancel</button>
                    </div>
                </form >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageBannerForm));