import { Component } from 'react';
// import './PaymentStatus.scss';
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import {
    Routes,
    Route,
} from "react-router-dom";
import { updateOrderStatus } from 'services/paymentService';
import { Link } from 'react-router-dom';

class PaymentStatus extends Component {
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
        let orderRef = this.props.searchParams.get('Ref')
        let resUpdateOrdStatus = await updateOrderStatus({ orderRef: orderRef })
    }

    statusText = (type) => {
        let objectText = {}
        switch (type) {
            case 'Success.js':
                objectText.status = 'Succeed'
                objectText.linkText = 'Go back to Homepage to pay more'
                break
            case 'Fail.js':
                objectText.status = 'Failed'
                objectText.linkText = 'Go back to Homepage to try again'
                break
            case 'Cancel.js':
                objectText.status = 'Cancelled'
                objectText.linkText = 'Go back to Homepage to pay again'
                break
            default:
                break
        }
        return objectText
    }

    render() {
        let type = this.props.params?.type
        let orderId = this.props.params?.orderId
        console.log('typ', type, 'ord id', this.props.searchParams.get('Ref'))
        let objectText = this.statusText(type)
        return (
            <>
                <div className='d-flex justify-content-center pt-5'>
                    <p>
                        Dear Customers,
                        <br></br>
                        Thank you for payment, your payment process is <b>{objectText?.status}</b>.
                        <br></br>
                        Please check your email for more detail.
                        <br></br>
                        <Link to='/'>{objectText?.linkText}.</Link>
                    </p>
                </div>
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
