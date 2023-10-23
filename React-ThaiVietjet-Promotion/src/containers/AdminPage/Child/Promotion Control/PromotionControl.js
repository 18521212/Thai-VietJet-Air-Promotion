import { Component } from "react";
// import './PromotionControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { Routes, Route } from "react-router"
import PromotionSelect from "./Child/Promotion Select/PromotionSelect";
import PromotionForm from "./Child/Promotion Form/PromotionForm";
import PackForm from "./Child/Pack Form/PackForm";
import PackSelect from "./Child/Pack Select/Pack Select";

class PromotionControl extends Component {
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
                    <h3>Promotion Control</h3>
                    <Routes>
                        <Route path='*' element={<PromotionSelect />}></Route>
                        <Route path='promotion-form/:type?' element={<PromotionForm />}></Route>
                        <Route path='pack-form/:type?' element={<PackForm />}></Route>
                        <Route path='pack-select' element={<PackSelect />}></Route>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PromotionControl));