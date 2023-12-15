import { Component } from 'react';
// import './DataFeed.scss';
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import {
    Routes,
    Route,
} from "react-router-dom";
import { updateOrderStatus } from 'services/paymentService';

class DataFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // campaign: ''
        }
    }

    componentDidMount() {
        this.updateOrdStatus()
    }

    updateOrdStatus = async () => {
        let orderRef = 1
        let resUpdateOrdStatus = await updateOrderStatus({ orderRef: orderRef })
    }

    render() {
        console.log('prop', this.props)
        console.log('OK')
        return (
            <>
                OK
                <h5>DataFeed pay status</h5>
                <br></br>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataFeed));
