import { Component } from 'react';
import './AdminPage.scss';

import Header from './Child/Header Panel/Header';
import CampaignControl from './Child/Campaign Control/CampaignControl';
import HeaderControl from './Child/Header Control/HeaderControl';
import {
    Routes,
    Route,
} from "react-router-dom";
import BannerControl from './Child/Banner Control/BannerControl';
import BodyControl from './Child/Body Control/BodyControl';
import FooterControl from './Child/Footer Control/FooterControl';
import FormControl from './Child/Form Control/FormControl';
import InputControl from './Child/Input Control/InputControl';
import PromotionControl from './Child/Promotion Control/PromotionControl';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        document.title = 'System Admin'
    }

    render() {
        return (
            <div className='admin-page'>
                <Header />
                <h1 className='title-admin'>Admin Page</h1>
                <Routes>
                    <Route index element={<CampaignControl />} />
                    <Route path="/campaign*" element={<CampaignControl />} />
                    <Route path="/header*" element={<HeaderControl />} />
                    <Route path="/banner*" element={<BannerControl />} />
                    <Route path="/body*" element={<BodyControl />} />
                    <Route path="/form*" element={<FormControl />} />
                    <Route path="/input*" element={<InputControl />} />
                    <Route path="/footer*" element={<FooterControl />} />
                    <Route path="/promotion*" element={<PromotionControl />} />
                </Routes>
            </div>
        )
    }
}

export default AdminPage;
