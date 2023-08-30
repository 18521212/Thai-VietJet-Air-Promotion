import { Component } from "react";
import './Banner.scss'
import _ from 'lodash';

import {
    getAllBanners,
} from "../../../services/userService";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerImage: '',
        }
    }

    componentDidMount() {
        this.getDataBanner()
    }

    getDataBanner = async () => {
        let dataBanner = await getAllBanners();

        let desktop, mobile;
        dataBanner && dataBanner.data && dataBanner.data.length > 0 &&
            dataBanner.data.map((item, index) => {
                if (item.type === 'desktop') {
                    desktop = item
                } else if (item.type === 'mobile') {
                    mobile = item
                }
            })

        this.setState({
            bannerImage: {
                ...this.state.bannerImage,
                desktop: desktop.image,
                mobile: mobile.image
            }
        })
    }

    render() {
        let { bannerImage } = this.state;
        return (
            <>
                <div className="container-fluid p-0 top-section">
                    <picture>
                        < source
                            srcSet={bannerImage.mobile ? bannerImage.mobile : ''}
                            media="(max-width: 600px)"
                            className="img-fluid"
                        />
                        <img
                            className="img-fluid"
                            src={bannerImage.desktop ? bannerImage.desktop : ''}
                            alt="advertise-banner"
                        />
                    </picture>
                </div>
            </>
        )
    }
}

export default Banner;