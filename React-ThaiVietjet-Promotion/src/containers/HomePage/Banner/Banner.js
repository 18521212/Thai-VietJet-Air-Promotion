import { Component } from "react";
import './Banner.scss'
import _ from 'lodash';
import { getBanner } from "services";
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import Slider from "components/Slider/Slider";
import { association } from "utils";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerImage: '',
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        let bannerId = this.props.bannerId
        bannerId && this.props.loadBanner(bannerId)
    }

    getImageByType = (type, data) => {
        let arr = []
        if (!data || data?.length === 0) {
            return arr
        }
        arr = data.filter(item => item.type === type)
        return arr
    }

    render() {
        let banner = this.props?.banner.data
        let imageMobiles = this.getImageByType('mobile', banner?.[association.BANNER_IMAGEBANNER])
        let imageDesktops = this.getImageByType('desktop', banner?.[association.BANNER_IMAGEBANNER])
        console.log('i', imageMobiles)
        return (
            <>
                {banner &&
                    // <div className="container-fluid p-0 top-section">
                    //     <picture>
                    //         < source
                    //             srcSet={banner?.imageMobile}
                    //             media="(max-width: 600px)"
                    //             className="img-fluid"
                    //         />
                    //         <img
                    //             className="img-fluid"
                    //             src={banner?.imageDesktop}
                    //             alt="advertise-banner"
                    //             style={{ width: '100%', maxHeight: '30rem' }}
                    //         />
                    //     </picture>
                    // </div>
                    <>
                        <Slider
                            data={imageMobiles}
                            property={['image']}
                            className={'mobile-slide'}
                            id='mobile'
                        />
                        <Slider
                            data={imageDesktops}
                            property={['image']}
                            className={'desktop-slide'}
                            id='desktop'
                        />
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        banner: state.admin.banner
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadBanner: (id) => dispatch(actions.fetchBanner(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);