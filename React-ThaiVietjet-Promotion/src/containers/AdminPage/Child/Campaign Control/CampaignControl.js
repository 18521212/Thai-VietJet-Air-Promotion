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

class CampaignControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h3>Campaign Section</h3>
                <hr></hr>
                <Routes>
                    <Route path="*" element={<CampaignSelect />} />
                    <Route path="campaign-form/:type?" element={<CampaignForm />} />
                </Routes>
            </div>
        )
    }
}

export default withRouter(CampaignControl);