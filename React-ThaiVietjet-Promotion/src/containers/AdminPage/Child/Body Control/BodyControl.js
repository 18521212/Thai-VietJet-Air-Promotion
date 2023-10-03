import { Component } from "react";
import './BodyControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { Route, Routes } from "react-router";
import BodyForm from "./Child/Body Form/BodyForm";
import BodySelect from "./Child/Body Select/BodySelect";

class BodyControl extends Component {
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
                <h3>Body Control</h3>
                <Routes>
                    <Route path="*" element={<BodySelect />} />
                    <Route path="/body-form" element={<BodyForm />} />
                </Routes>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BodyControl));