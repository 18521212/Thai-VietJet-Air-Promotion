import { Component } from "react";
import './Banner.scss'
import _ from 'lodash';
import { getBanner } from "services";
import { connect } from 'react-redux';
import * as actions from 'store/actions';

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

    render() {
        let banner = this.props?.banner.data
        return (
            <>
                {banner &&
                    <div className="container-fluid p-0 top-section">
                        <picture>
                            < source
                                srcSet={banner?.imageMobile}
                                media="(max-width: 600px)"
                                className="img-fluid"
                            />
                            <img
                                className="img-fluid"
                                src={banner?.imageDesktop}
                                alt="advertise-banner"
                            />
                        </picture>
                    </div>
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