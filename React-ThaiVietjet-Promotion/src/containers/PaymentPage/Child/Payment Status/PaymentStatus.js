import { Component } from 'react';
// import './PaymentStatus.scss';
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
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
                objectText.status = 'Success'
                objectText.linkText = 'Go back to Homepage to pay more'
                objectText.icon = {
                    class: 'fas fa-check-circle',
                    color: '#54c05b'
                }
                break
            case 'Fail.js':
                objectText.status = 'Failed'
                objectText.linkText = 'Go back to Homepage to try again'
                objectText.icon = {
                    class: 'fas fa-times-circle',
                    color: '#ee5d5d'
                }
                break
            case 'Cancel.js':
                objectText.status = 'Cancelled'
                objectText.linkText = 'Go back to Homepage to pay again'
                objectText.icon = {
                    class: 'fas fa-times-circle',
                    color: '#fbd960'
                }
                break
            default:
                break
        }
        return objectText
    }

    render() {
        let type = this.props.params?.type
        let orderId = this.props.params?.Ref
        console.log('typ', type, 'ord id', this.props.searchParams.get('Ref'))
        let objectText = this.statusText(type)
        return (
            <>
                <div className='d-flex justify-content-center pt-5'>
                    <div>
                        <div className='d-flex justify-content-center pt-5'>
                            <i class={objectText.icon.class} style={{ color: objectText.icon.color, fontSize: '4rem' }}></i>
                        </div>
                        <p style={{ fontSize: '1.5rem' }}>
                            Dear Customers,
                            <br></br>
                            <br></br>
                            Order Id: <b>{this.props.searchParams.get('Ref')}</b>
                            <br></br>
                            Transaction Status: <b style={{ color: objectText?.icon?.color }}>{objectText?.status}</b>
                            <br></br>
                            <br></br>
                            Please check your email for more details.
                            <br></br>
                            Thanks for your purchasing.
                            <br></br>
                            <br></br>
                            <Link to='/'>{objectText?.linkText}.</Link>
                        </p>
                    </div>
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
