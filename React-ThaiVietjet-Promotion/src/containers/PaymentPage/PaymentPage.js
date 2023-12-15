import { Component } from 'react';
// import './PaymentPage.scss';
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import {
    Routes,
    Route,
} from "react-router-dom";
import Cart from './Child/Cart/Cart';
import PaymentStatus from './Child/Payment Status/PaymentStatus';
// import DataFeed from './Child/DataFeed/DataFeed';

class PaymentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // campaign: ''
        }
    }

    render() {
        return (
            <>
                <h5>Payment</h5>
                <Routes>
                    <Route index element={<Cart />} />
                    <Route path="/payment-status/:type" element={<PaymentStatus />} ></Route>
                    {/* <Route path="/datafeed" element={<DataFeed />} ></Route> */}
                </Routes>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentPage));
