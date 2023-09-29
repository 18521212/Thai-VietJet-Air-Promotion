import { Component } from "react";
// import Select from 'react-select';
import Select from "components/Select/Select";
import './CampaignSelect.scss'
import _ from 'lodash';
import { getAllCampaign } from 'services/userService';
import CampaignForm from "../Campaign Form/CampaignForm";
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter";

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
        this.buildDataAndMapState()
    }

    buildDataOption = () => {

    }

    buildDataAndMapState = async () => {
        let dataCampaign = await getAllCampaign()

        let dataOption = [];
        dataCampaign.data.map((item, index) => {
            dataOption.push({ value: { ...item }, label: item.name })
        })

        this.setState({
            optionCampaign: dataOption,
            dataCampaign: dataCampaign.data
        })
    }

    handleOnChangeSelect = (selectedCampaign) => {
        this.setState({ selectedCampaign })
        this.handleNav('../campaign-detail', { campaign: selectedCampaign.value })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        let { selectedCampaign, listCampaign, dataCampaign } = this.state;
        let { campaignOption } = this.props
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="select-campaign col-md-5">
                            <label>Choose campaign</label>
                            <Select className="select-number"
                                value={selectedCampaign}
                                options={campaignOption}
                                onChange={this.handleOnChangeSelect}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Header Id</th>
                                    <th scope="col">Banner Id</th>
                                    <th scope="col">Body Id</th>
                                    <th scope="col">Form Id</th>
                                    <th scope="col">Footer Id</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
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