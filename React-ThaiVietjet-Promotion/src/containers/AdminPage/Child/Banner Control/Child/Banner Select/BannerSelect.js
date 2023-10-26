import { Component } from "react";
import './BannerSelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table";
import Select from "components/Select/Select";
import { func } from 'utils'
import { deleteBanner } from "services/userService";

class BannerSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBanner: '',
        }
    }

    componentDidMount() {
        this.props.loadBanner()
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleCreate = () => {
        func.NAV(this, '../banner-form')
    }

    handleUpdate = (data) => {
        func.NAV(this, '../banner-form/update', { banner: data })
    }

    handleDelete = (data) => {
        func.HANDLE_DELETE('Delete this Banner?', data, deleteBanner, this.props.loadBanner)
    }

    render() {
        let { banners, bannerOption } = this.props
        return (
            <>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <Select
                            value='selectedBanner'
                            options='bannerOption'
                            nameProps='banner'
                            linkNav='../banner-form/update'
                            parent={this}
                        />
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success mx-1 mb-1 ml-auto"
                        onClick={() => this.handleCreate()}>Create</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Table data={banners.data}
                            thead={['Id', 'Name', 'Image Mobile', 'Image Desktop']}
                            tbody={['id', 'name',
                                { name: 'imageMobile', type: 'image' },
                                { name: 'imageDesktop', type: 'image' }
                            ]}
                            actions={(data) =>
                                <>
                                    <button type="button" className="btn btn-warning mx-1"
                                        onClick={() => this.handleUpdate(data)}>Update</button>
                                    <button type="button" className="btn btn-danger mx-1"
                                        onClick={() => this.handleDelete(data)}>Delete</button>
                                </>
                            }
                        />
                    </div>
                </div >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        banners: state.admin.banners,
        bannerOption: state.admin.bannerOption
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadBanner: () => dispatch(actions.fetchBanner())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BannerSelect));