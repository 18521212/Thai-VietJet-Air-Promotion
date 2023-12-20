import { Component } from 'react';
// import './DataFeed.scss';
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import {
    Routes,
    Route,
} from "react-router-dom";
import { updateOrderStatus, dataFeed } from 'services/paymentService';

class DataFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // campaign: ''
        }
    }

    // componentDidMount() {
    //     this.updateOrdStatus()
    // }

    updateOrdStatus = async () => {
        let orderRef = this.props.params?.Ref
        // let resUpdateOrdStatus = await updateOrderStatus({ orderRef: orderRef })
        // await dataFeed()
    }

    render() {
        return null
        return (
            <>
                {/* {successcode == 0 ? 'OK' : undefined}
                <h5>DataFeed</h5>
                <br></br> */}
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
