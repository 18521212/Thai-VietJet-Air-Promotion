import { Component } from 'react';
// import './Cart.scss';
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from 'store/actions';

let testDataPayment = [
    { productName: 'pack 1', number: 1, total: 40 },
    { productName: 'pack 2', number: 4, total: 80 },
    { productName: 'pack 3', number: 2, total: 60 },
]

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // campaign: ''
        }
    }

    render() {
        let resPayment = this.props?.location?.state?.resPayment
        // let data = testDataPayment
        let data = resPayment?.res?.data?.productArr
        let totalPriceInVat = resPayment?.res?.data?.validatePayment?.totalPriceInVat
        let secureHash = resPayment?.res?.data?.secureHash
        console.log('da cart', secureHash)
        return (
            <>
                <h3>Cart</h3>
                {data.length > 0 &&
                    <>
                        <div className='d-flex justify-content-center'>
                            <div className='col-6'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Number</th>
                                            <th>{`Total (Included VAT)`}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.length > 0 && data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {item.name}
                                                    </td>
                                                    <td>
                                                        {item.sentNumber}
                                                    </td>
                                                    <td>
                                                        {item.totalPriceInVat}
                                                    </td>
                                                </tr>
                                            )
                                            // total data
                                            // route from root
                                            // route from cart
                                        })}
                                        <tr>
                                            <th>Total</th>
                                            <td></td>
                                            <td>{totalPriceInVat} THB</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <form name="payFormCcard" method="post" action=" https://psipay.bangkokbank.com/b2c/eng/payment/payForm.jsp"
                                >
                                    <input type="hidden" name="merchantId" value="3082" />
                                    <input type="hidden" name="amount" value={totalPriceInVat} />
                                    <input type="hidden" name="orderRef" value="0" />
                                    <input type="hidden" name="currCode" value="764" />
                                    <input type="hidden" name="successUrl" value="http://localhost:3000/payment/payment-status/Success.js" />
                                    <input type="hidden" name="failUrl" value="http://localhost:3000/payment/payment-status/Fail.js" />
                                    <input type="hidden" name="cancelUrl" value="http://localhost:3000/payment/payment-status/Cancel.js" />
                                    <input type="hidden" name="payType" value="N" />
                                    <input type="hidden" name="lang" value="E" />
                                    <input type="hidden" name="remark" value="-" />
                                    <input type="hidden" name="secureHash" value={secureHash} />
                                    <input type="submit" name="submit" value='Pay Now' className='ml-auto' />
                                </form>
                            </div>
                        </div>
                    </>
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));