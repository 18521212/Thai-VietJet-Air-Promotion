import { Component } from "react";
// import './InputForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import {
    Routes,
    Route,
} from "react-router-dom";
import TextInputForm from "./Child/Text Input Form/TextInputForm";
import DropdownForm from "./Child/Dropdown Form/DropdownForm";

class InputForm extends Component {
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
                    <h3>Input Control</h3>
                    <Routes>
                        <Route path='text/:type?' element={<TextInputForm />}></Route>
                        <Route path='dropdown/:type?' element={<DropdownForm />}></Route>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputForm));