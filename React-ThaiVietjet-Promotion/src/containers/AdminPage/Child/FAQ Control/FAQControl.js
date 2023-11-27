import { Component } from "react";
// import './FAQControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { Routes, Route } from "react-router";
import FAQList from "./Child/FAQ List/FAQList";
import FAQForm from "./Child/FAQ Form/FAQForm";
import QAForm from "./Child/QA Form/QAForm";
import QAList from "./Child/QA List/QAList";

class FAQControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <h3>FAQ Section</h3>
                    <hr></hr>
                    <Routes>
                        <Route path='*' element={<FAQList />}></Route>
                        <Route path='faq-form/:type?' element={<FAQForm />}></Route>
                        <Route path='faqquestion-form/:type?' element={<QAForm />}></Route>
                        <Route path='faqquestion-list' element={<QAList />}></Route>
                    </Routes>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQControl));