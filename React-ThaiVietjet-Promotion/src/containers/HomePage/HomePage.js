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

    async componentDidMount() {
        document.title = "VietjetAir - Gift Voucher dev"
        await this.props.loadCampaign(this.props.params.id)
        this.mapCampaignData()
    }

    mapCampaignData = () => {
        let campaign = this.props.campaign ?
            this.props.campaign.data
            :
            this.props.campaigns && this.props.campaigns.data.length > 0 ?
                this.props.campaigns.data[0]
                :
                ''
        this.setState({
            campaign: campaign
        })
    }

    render() {
        let { campaign } = this.state
        // console.log(campaign)
        return (
            <>
                {campaign && // if doesn't has this line, first mount (not did mount) or first render will not get value id
                    <>
                        <Header headerId={campaign.headerId} />
                        <Banner bannerId={campaign.bannerId} />
                        <Body bodyId={campaign.bodyId} />
                        <section className="join-us" id="register-purchase">
                            <Form formSectionId={campaign.formSectionId} />
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
        loadCampaign: (id) => dispatch(actions.fetchCampaign(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
