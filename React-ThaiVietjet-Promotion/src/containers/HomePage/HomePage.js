import { Component } from 'react';
import './HomePage.scss';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Body from './Body/Body';
import Form from './Form/Form';
import Footer from './Footer/Footer';
import withRouter from 'components/withRouter/withRouter';
import { connect } from 'react-redux';
import * as actions from 'store/actions';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaign: ''
        }
    }

    componentDidMount() {
        document.title = "VietjetAir - Gift Voucher dev"
        this.loadData()
    }

    loadData = async () => {
        await this.props.loadCampaign(this.props.params.id)
        this.mapCampaignData()
    }

    mapCampaignData = async () => {
        let campaign = this.props.campaign ?
            this.props.campaign.data
            :
            this.props.campaigns && this.props.campaigns.data.length > 0 ?
                this.props.campaigns.data[0]
                :
                ''
        await this.props.loadPromotion(campaign?.promotionId)
        this.setState({
            campaign: campaign
        })
    }

    render() {
        let { campaign } = this.state
        return (
            <>
                {campaign &&
                    <>
                        <Header headerId={campaign.headerId} />
                        <Banner bannerId={campaign.bannerId} />
                        <Body bodyId={campaign.bodyId} />
                        <section className="join-us" id="register-purchase">
                            <Form formId={campaign.formId} footerId={campaign.footerId} />
                            <Footer footerId={campaign.footerId} />
                        </section>
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        campaign: state.admin.campaign,
        campaigns: state.admin.campaigns
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCampaign: (id) => dispatch(actions.fetchCampaign(id)),
        loadPromotion: (id) => dispatch(actions.fetchPromotion(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
