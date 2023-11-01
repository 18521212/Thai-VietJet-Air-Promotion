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
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux'
import * as actions from 'store/actions';

import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from 'aws-exports'
Amplify.configure(awsconfig);

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        document.title = 'System Admin'
        this.saveUser()
    }

    saveUser = () => {
        let user = this.props.user
        if (user) this.props.saveUser(user)
    }

    render() {
        const { signOut, user } = this.props;
        return (
            <div className='admin-page'
                style={{ width: '100vw', height: '100vh' }}
            >
                <Header
                    signOut={signOut}
                />
                <h1 className='title-admin'>Admin Page</h1> <hr></hr>
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

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveUser: (user) => dispatch(actions.saveUser(user))
    };
};

export default withAuthenticator(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminPage))
    , { hideSignUp: true });
