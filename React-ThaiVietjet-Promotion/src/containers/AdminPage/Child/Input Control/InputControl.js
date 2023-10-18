import { Component } from "react";
// import './InputControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import InputSelect from "./Child/Input Select/InputSelect";
import InputDetail from "./Child/Input Detail/InputDetail";
import {
    Routes,
    Route,
} from "react-router-dom";
import InputForm from "./Child/Input Form/InputForm";

class InputControl extends Component {
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
                    <h3>Input Control</h3>
                    <Routes>
                        <Route path='*' element={<InputSelect />}></Route>
                        <Route path='input-detail' element={<InputDetail />}></Route>
                        <Route path='input-form*' element={<InputForm />}></Route>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputControl));