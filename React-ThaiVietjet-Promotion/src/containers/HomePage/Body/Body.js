import { Component } from "react";
import './Body.scss';
// import banner_desktop from '../../../assets/Banner/banner.jpg';
// import banner_mobile from '../../../assets/Banner/banner-mobile.jpg';
import top_cloud from '../../../assets/Background/top_cloud.png';
import Select from 'react-select';

import PowerPack from './Child/PowerPack';

import {
    getAllBanners, getAllTextInput, getFormSectionById,
    getAllPack, getContentBodyById
} from "../../../services/userService";

import _ from 'lodash';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packData: '',
            contentBodyData: ''
        }
    }

    componentDidMount() {
        this.getDataAndMapState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getDataAndMapState = async () => {
        // pack data
        let packData = await getAllPack();
        // content body data
        let contentBodyData = await getContentBodyById(1);

        this.setState({
            packData: packData.data,
            contentBodyData: contentBodyData.data
        })
    }

    render() {
        let {
            packData, contentBodyData
        } = this.state;

        return (
            <div className='body pt-10'>
                <section className="main-content-container mt-20"
                    style={{ paddingBottom: '10%' }}
                >
                    <PowerPack
                        packData={packData}
                        contentBodyData={contentBodyData}
                    />

                    <span className="img-container">
                        <img className="container-fluid p-0" src={top_cloud} alt="top-cloud" />
                    </span>
                </section>
            </div >
        )
    }
}

export default Body;