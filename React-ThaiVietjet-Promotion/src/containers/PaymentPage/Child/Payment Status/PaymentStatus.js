import { Component } from 'react';
// import './PaymentStatus.scss';
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import {
    Routes,
    Route,
} from "react-router-dom";
import PaymentSuccess from './Child/Payment Success/PaymentSuccess';
import PaymentFail from './Child/Payment Fail/PaymentFail';
import PaymentCancel from './Child/Payment Cancel/PaymentCancel';

class PaymentStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // campaign: ''
        }
    }

    render() {
        let type = this.props.params?.type
        console.log('typ', type)
        return (
            <>
                <h5>Payment Status</h5>
                <br></br>
                {type === 'Success.js' && <PaymentSuccess />}
                {type === 'Fail.js' && <PaymentFail />}
                {type === 'Cancel.js' && <PaymentCancel />}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        // campaign: state.admin.campaign,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // loadCampaign: (id) => dispatch(actions.fetchCampaign(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentStatus));
