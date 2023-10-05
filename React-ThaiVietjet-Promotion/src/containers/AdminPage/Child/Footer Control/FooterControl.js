import { Component } from "react";
import './FooterControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { Routes, Route } from "react-router";
import FooterSelect from "./Child/Footer Select/FooterSelect";
import FooterForm from "./Child/Footer Form/FooterForm";
import FooterTextSelect from "./Child/Footer Text Select/FooterTextSelect";
import FooterTextForm from "./Child/Footer Text Form/FooterTextForm";

class FooterControl extends Component {
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
                    <h3>Footer Control</h3>
                    <Routes>
                        <Route path='*' element={<FooterSelect />}></Route>
                        <Route path='footer-form/:type?' element={<FooterForm />}></Route>
                        <Route path="footer-text-select" element={<FooterTextSelect />}></Route>
                        <Route path="footer-text-form/:type?" element={<FooterTextForm />}></Route>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterControl));