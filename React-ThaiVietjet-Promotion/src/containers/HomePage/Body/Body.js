import { Component } from "react";
import './Body.scss';
// import banner_desktop from '../../../assets/Banner/banner.jpg';
// import banner_mobile from '../../../assets/Banner/banner-mobile.jpg';
import top_cloud from '../../../assets/Background/top_cloud.png';
import Select from 'react-select';
import PowerPack from './Child/PowerPack';
import {
    getAllPack
} from "../../../services/userService";
import { getBody } from "services/bodyService";
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import withRouter from 'components/withRouter/withRouter';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    loadData = async () => {
        let bodyId = this.props.bodyId
        await this.props.loadBody(bodyId)
    }

    render() {
        return (
            <div className='body pt-10'>
                <section className="main-content-container mt-20"
                    style={{ paddingBottom: '10%' }}
                >
                    <PowerPack
                        packData={this.props.promotion?.data.pack}
                        contentBodyData={this.props.body.data}
                    />

                    <span className="img-container">
                        <img className="p-0 w-100 h-auto" src={top_cloud} alt="top-cloud" />
                    </span>
                </section>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        body: state.admin.body,
        promotion: state.admin.promotion,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadBody: (id) => dispatch(actions.fetchBody(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body));