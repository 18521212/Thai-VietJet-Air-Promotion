import { Component } from "react";
import './BodyControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { Route, Routes } from "react-router";
import BodyForm from "./Child/Body Form/BodyForm";
import BodySelect from "./Child/Body Select/BodySelect";
import BodyDetail from "./Child/Body Detail/BodyDetail";

class BodyControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        let a = { b: 1, c: 2 }
        let b = { c: 3, e: 4 }
        // console.log('a', { ...a, ...b })
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        return (
            <div className="container-fluid">
                <h3>Body Section</h3>
                <hr></hr>
                <Routes>
                    <Route path="*" element={<BodySelect />} />
                    <Route path="body-detail" element={<BodyDetail />} />
                    <Route path="body-form/:type?" element={<BodyForm />} />
                </Routes>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BodyControl));