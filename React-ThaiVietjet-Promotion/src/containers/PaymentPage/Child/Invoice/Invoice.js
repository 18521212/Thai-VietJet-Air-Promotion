import { Component } from "react";
import './Invoice.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import HeaderWhite from "components/Header/HeaderWhite/HeaderWhite";
import { getOrder } from "services/paymentService";

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: '',
            notFound: false,
        }
    }

    componentDidMount() {
        this.dataOrder()
    }

    dataOrder = async () => {
        let ref = this.props.params.ref
        let order = {}
        try {
            order = await getOrder(ref);
        } catch (e) {
            this.setState({ notFound: true })
            return
        }
        this.setState({ order })
    }

    render() {
        console.log('-', this.props.params)
        console.log(this.state.order.data)
        let order = this.state.order.data
        return (
            <div className="invoice">
                <HeaderWhite />
                {order &&
                    <>
                        <div className='d-flex justify-content-center pt-5'>
                            <div className='col-md-8'>
                                <div className='transaction-frame bg-light'>
                                    <div className='header'>Transaction Status</div>
                                    <div className="body-div px-3 pt-4 pb-2">
                                        <div>
                                            <b>orderRef:</b> {this.props.params.ref}
                                        </div>
                                        <div>
                                            <b>status:</b> {order.status}
                                        </div>
                                        <div>
                                            <b>Finish status:</b> {['Accepted', 'Rejected', 'Canceled'].includes(order.status) ? 'YES' : 'NO'}
                                        </div>

                                    </div>
                                </div>
                                <div className="bg-warning px-2 mt-2">
                                    <b>Note:</b> <p>When 'Finish status' equal 'NO' transaction status can be still changed in the future</p>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {this.state.notFound &&
                    <div className='d-flex justify-content-center pt-5'>
                        Server is under maintenance or error, please contact us via email
                    </div>
                }
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
        // funcReact: () => dispatch(actions.funcRedux())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoice));