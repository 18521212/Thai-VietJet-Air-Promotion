import { Component } from "react";
import './Banner.scss'
import _ from 'lodash';

import {
    getAllBanners,
} from "services/userService";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerImage: '',
        }
    }

    componentDidMount() {

    }

    render() {
        let { bannerImage } = this.state;
        return (
            <>
                <div className="container-fluid p-0 top-section">
                    <picture>
                        < source
                            // srcSet={bannerImage.mobile ? bannerImage.mobile : ''}
                            media="(max-width: 600px)"
                            className="img-fluid"
                        />
                        <img
                            className="img-fluid"
                            // src={bannerImage.desktop ? bannerImage.desktop : ''}
                            alt="advertise-banner"
                        />
                    </picture>
                </div>
            </>
        )
    }
}

export default Banner;