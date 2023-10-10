import { Component } from "react";
import './FormControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { Routes, Route } from "react-router";
import FormSelect from "./Child/Form Select/FormSelect";
import FormManage from "./Child/Form Manage/FormManage";
import InputSelect from "./Child/Input Select/InputSelect";
import FormDetail from "./Child/Form Detail/FormDetail";

class FormControl extends Component {
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
                    <h3>Form Control</h3>
                    <Routes>
                        <Route path='*' element={<FormSelect />}></Route>
                        <Route path='form-manage/:type?' element={<FormManage />}></Route>
                        <Route path='input-select' element={<InputSelect />}></Route>
                        <Route path='form-detail' element={<FormDetail />}></Route>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormControl));