import { Component } from "react";
import './Body.scss';
// import banner_desktop from '../../../assets/Banner/banner.jpg';
// import banner_mobile from '../../../assets/Banner/banner-mobile.jpg';
import top_cloud from '../../../assets/Background/top_cloud.png';
import Select from 'react-select';

import PowerPack from './Child/PowerPack';

import {
    getAllBanners, getAllTextInput, getFormSectionById,
    getAllPack
} from "../../../services/userService";

import _ from 'lodash';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //hardcode data api
            listPack: [
                { id: '4', pack_name: 'pack 4', price: 6400, code_number: 6, avg_price: 1660 },
                { id: '6', pack_name: 'pack 6', price: 9000, code_number: 3, avg_price: 1500 },
                { id: '12', pack_name: 'pack 12', price: 16800, code_number: 2, avg_price: 1400 },
                { id: '24', pack_name: 'pack 24', price: 30000, code_number: 1, avg_price: 1250 },
            ],

            packData: '',
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

        this.setState({
            packData: packData.data,
        })
    }

    render() {
        let {
            packData
        } = this.state;

        return (
            <div className='body pt-10'>
                <section className="main-content-container mt-20"
                    style={{ paddingBottom: '10%' }}
                >
                    <PowerPack
                        packData={packData}
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