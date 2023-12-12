import { Component } from "react";
// import './PaymentFail.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class PaymentFail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        return (
            <>
                <p>
                    Dear Customers,
                    <br></br>
                    Thank you for payment, your payment process is fail.
                    <br></br>
                    <Link to='/'>Go homepage and try again</Link>
                </p>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentFail));