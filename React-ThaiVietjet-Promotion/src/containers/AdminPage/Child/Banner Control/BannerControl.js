import { Component } from "react";
import './BannerControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import {
    Routes,
    Route,
} from "react-router-dom";
import BannerSelect from "./Child/Banner Select/BannerSelect";
import BannerForm from "./Child/BannerForm/BannerForm";
import ImageBannerForm from "./Child/Image Banner Form/ImageBannerForm";
import ImageBannerList from "./Child/Image Banner List/ImageBannerList";

class BannerControl extends Component {
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
                    <h3>Banner Section</h3>
                    <hr></hr>
                    <Routes>
                        <Route path="*" element={<BannerSelect />} />
                        <Route path="banner-form/:type?" element={<BannerForm />} />
                        <Route path="image-banner-list" element={<ImageBannerList />} />
                        <Route path="image-banner-form/:type?" element={<ImageBannerForm />} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BannerControl));