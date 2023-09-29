import { Component } from "react";
import './CampaignDetail.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter";
import { connect } from 'react-redux'

class CampaignDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.loadCampain()
    }

    loadCampain = () => {
        let { campaign } = this.props.location.state
        this.props.loadCampain(campaign.id)
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    show = (a) => {
        return a ?
            <>
                <td>{a}</td>
            </>
            :
            <>
                <td>Campaign hasn't this item yet</td>
            </>
    }

    render() {
        let campaign = this.props.campaign.data
        return (
            <>
                <div className="row px-3 my-1">
                    <button className="btn btn-primary mr-auto mx-1"
                        onClick={() => this.handleNav(-1)}>Back</button>
                    <button className="btn btn-warning ml-auto mx-1"
                        onClick={() => this.handleNav('../campaign-form', { campaign: campaign })}>Update</button>
                </div>
                {campaign &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Column</th>
                                <th scope="col">Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Header</th>
                                {this.show(campaign?.headerId)}
                            </tr>
                            <tr>
                                <th>Banner</th>
                                {this.show(campaign?.bannerId)}
                            </tr>
                            <tr>
                                <th>Body</th>
                                {this.show(campaign?.bodyId)}
                            </tr>
                            <tr>
                                <th>Form</th>
                                {this.show(campaign?.formSectionId)}
                            </tr>
                            <tr>
                                <th>Footer</th>
                                {this.show(campaign?.footerId)}
                            </tr>
                        </tbody>
                    </table>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        campaign: state.admin.campaign
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCampain: (id) => dispatch(actions.fetchCampaign(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignDetail));