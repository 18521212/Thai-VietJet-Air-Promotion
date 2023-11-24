import { Component } from "react";
// import './ImageBannerList.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table";
import Select from "components/Select/Select";
import { func, association } from 'utils'
import { deleteImageBanner } from "services/bannerService";

class ImageBannerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    componentDidMount() {
        this.loadData()
        this.mapData()
    }

    mapData = () => {
        func.MAP_STATE_ROUTE(this, {
            object: 'banner',
            property: ['id']
        }, {})
    }

    loadData = async () => {
        let banner = this.props.location.state.banner
        await this.props.loadBanner(banner.id)
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onDelete = (data) => {
        func.HANDLE_DELETE('Delete this Image?', data, deleteImageBanner, () => { this.loadData() })
    }

    render() {
        let data = this.props?.banner.data?.[association.BANNER_IMAGEBANNER]
        return (
            <>
                <h3>Image Banner List</h3>
                <div className="row">
                    <div className="form-group col-md-2">
                        <label>Banner Id</label>
                        <input className="form-control" value={this.state?.id}
                            disabled type='text' />
                    </div>
                </div>
                <div className="row mx-0">
                    <button type="button" className="btn btn-primary mx-1 mb-1 mr-auto"
                        onClick={() => func.NAV(this, './banner')}
                    >Back</button>
                    <button type="button" className="btn btn-success mx-1 mb-1 ml-auto"
                        onClick={() => func.NAV(this, '../image-banner-form', { banner: this.props.location.state.banner })}
                    >Add Image</button>
                </div>
                <div className="row mx-0">
                    <Table
                        data={data}
                        thead={['Id', 'Type', 'Image']}
                        tbody={['id', 'type',
                            { name: 'image', type: 'image' }
                        ]}
                        actions={(data) =>
                            <>
                                <button type="button" className="btn btn-danger mx-1"
                                    onClick={() => this.onDelete(data)}
                                >Delete</button>
                            </>
                        }
                    />
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        banner: state.admin.banner
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadBanner: (id) => dispatch(actions.fetchBanner(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageBannerList));