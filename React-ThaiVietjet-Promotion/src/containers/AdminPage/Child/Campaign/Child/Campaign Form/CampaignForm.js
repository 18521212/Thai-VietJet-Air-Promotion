import { Component } from "react";
import './CampaignForm.scss'
import _ from 'lodash';

class CampaignForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { selectedCampaign } = this.props;
        return (
            <>
                <div className='header-control-admin'>
                    <label>Header:</label>
                    <span> </span>
                </div>

                <div className='banner-control-admin'>
                    <label>Banner:</label>
                    <span> {selectedCampaign && selectedCampaign.value && selectedCampaign.value.bannerId}</span>
                </div>

                <div className='body-control-admin'>
                    <label>Body:</label>
                    <span> {selectedCampaign && selectedCampaign.value && selectedCampaign.value.bodyId}</span>
                </div>

                <div className='banner-control-admin'>
                    <label>Form Section:</label>
                    <span> {selectedCampaign && selectedCampaign.value && selectedCampaign.value.formSectionId}</span>
                </div>

                <div className='footer-control-admin'>
                    <label>Footer:</label>
                    <span> {selectedCampaign && selectedCampaign.value && selectedCampaign.value.footerId}</span>
                </div>
            </>
        )
    }
}

export default CampaignForm;