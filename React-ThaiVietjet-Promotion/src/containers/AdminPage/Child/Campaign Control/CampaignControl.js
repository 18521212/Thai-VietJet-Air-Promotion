import { Component } from "react";
import './CampaignControl.scss'
import _ from 'lodash';
import {
    Routes,
    Route,
} from "react-router-dom";
import CampaignSelect from "./Child/Campaign Select/CampaignSelect";
import CampaignForm from "./Child/Campaign Form/CampaignForm";
import withRouter from "components/withRouter/withRouter";
import CampaignDetail from "./Child/Campaign Detail/CampaignDetail";

class CampaignControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h3>Campaign Control</h3>
                <Routes>
                    <Route path="*" element={<CampaignSelect />} />
                    <Route path="campaign-detail*" element={<CampaignDetail />} />
                    <Route path="campaign-form*" element={<CampaignForm />} />
                </Routes>
            </div>
        )
    }
}

export default withRouter(CampaignControl);