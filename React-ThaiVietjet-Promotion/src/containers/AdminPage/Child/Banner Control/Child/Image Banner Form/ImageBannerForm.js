import { Component } from "react";
import './ImageBannerForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import { createImageBanner } from "services/bannerService";
import Select from "components/Select/Select";

let configImage = {
    mobile: { width: 1040, height: 1040 },
    desktop: { width: 1920, height: 520 },
}

let typeOption = [
    { value: 'mobile', label: 'Mobile', image: configImage.mobile },
    { value: 'desktop', label: 'Desktop', image: configImage.desktop },
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
            [{ key: 'bannerId', property: ['id'] }, 'image', { key: 'type', property: ['selectedType', 'value'] }],
            {
                func: createImageBanner,
                callBack: () => { func.NAV(this, '../image-banner-list', { banner: this.props.location.state?.banner }) }
            },
            {

            })
    }

    validImage = () => {
        let result = true
        let image = this.state.image
        let selectedType = this.state.selectedType
        var i = new Image();
        i.src = image;
        if (i.width != selectedType.image.width || i.height != selectedType.image.height) {
            result = false
        }
        return result
    }

    render() {
        let { type } = this.props.params
        // console.log('im',this.state.image.offsetHeight)
        this.validImage()
        return (
            <div className="image-banner-form">
                <h3>Image Banner Form</h3>
                <form className="row was-validated">
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
                                accept="image/png, image/jpeg"
                                required
                            />
                            <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                            <div
                                class={`invalid-feedback ${!this.validImage() ? 'd-block' : ''}`}
                            >
                                {!this.validImage() ?
                                    `Invalid Image, 
                                    ${this.state.selectedType.value} size required (width: ${this.state.selectedType.image.width}px, 
                                    height: ${this.state.selectedType.image.height}px)`
                                    :
                                    'Image Type'
                                }

                            </div>
                        </div>
                        <img src={this.state.image} className="image-preview" />
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
            </div>
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