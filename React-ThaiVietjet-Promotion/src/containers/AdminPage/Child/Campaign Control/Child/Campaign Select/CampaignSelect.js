import { Component } from "react";
// import Select from 'react-select';
import Select from "components/Select/Select";
import './CampaignSelect.scss'
import _ from 'lodash';
import CampaignForm from "../Campaign Form/CampaignForm";
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter";
import { func } from "utils";
import { deleteCampaign } from "services/userService";


class CampaignSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCampaign: '',
            selectedCampaign: '',
            optionCampaign: '',
            dataCampaign: '',
        }
    }

    componentDidMount() {
        this.props.loadCampaign()
    }

    handleView = (data) => {
        this.handleNav('../campaign-detail', { campaign: data })
    }

    handleCreate = () => {
        this.handleNav('../campaign-form')
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleDelete = (id) => {
        func.ALERT_CONFIRM('Are you want to delete?', async () => {
            let res = await deleteCampaign({ id: id })
            func.ALERT_RES(res) && this.props.loadCampaign()
        })
    }

    render() {
        let { selectedCampaign, listCampaign, dataCampaign } = this.state;
        let { campaignOption } = this.props
        let campaigns = this.props.campaigns.data
        return (
            <>
                <h3>Campaigns</h3>
                <div className="container-fluid">
                    <div className="row">
                        <div className="select-campaign col-md-5">
                            <label>Choose campaign</label>
                            <Select className="select-number"
                                value='selectedCampaign'
                                options='campaignOption'
                                nameProps='campaign'
                                linkNav='../campaign-form/update'
                                parent={this}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn btn-success ml-auto my-1"
                            onClick={() => this.handleCreate()}>Create</button>
                    </div>
                    <div className="row">
                        {campaigns &&
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Header Id</th>
                                        <th scope="col">Banner Id</th>
                                        <th scope="col">Body Id</th>
                                        <th scope="col">Form Id</th>
                                        <th scope="col">Footer Id</th>
                                        <th scope="col">Promotion Id</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campaigns.map((item) => {
                                        return (
                                            <tr>
                                                <th>{item?.['id']}</th>
                                                <td>{item.name}</td>
                                                <td>{item.headerId}</td>
                                                <td>{item.bannerId}</td>
                                                <td>{item.bodyId}</td>
                                                <td>{item.formId}</td>
                                                <td>{item.footerId}</td>
                                                <td>{item.promotionId}</td>
                                                <td>
                                                    <button type="button" className="btn btn-warning mx-1"
                                                        onClick={() => func.NAV(this, '../campaign-form/update', { campaign: item })}
                                                    >Update</button>
                                                    <button type="button" className="btn btn-danger mx-1"
                                                        onClick={() => this.handleDelete(item.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        campaigns: state.admin.campaigns,
        campaignOption: state.admin.campaignOption
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCampaign: (id) => dispatch(actions.fetchCampaign(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignSelect));