import { Component } from "react"
import './CampaignForm.scss'
import _, { head } from 'lodash'
import Select from "components/Select/Select"
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { updateCampaign, createCampaign } from "services/userService"
import { func, component } from 'utils'

class CampaignForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            header: '',
            banner: '',
            body: '',
            form: '',
            footer: '',
            promotion: '',
        }
    }

    componentDidMount() {
        this.fetchAndMapDataSelect()
    }

    fetchAndMapDataSelect = async () => {
        await this.props.loadHeader()
        await this.props.loadBanner()
        await this.props.loadBody()
        await this.props.loadForm()
        await this.props.loadFooter()
        await this.props.loadPromotion()
        this.mapData()
    }

    mapData = () => {
        let campaign = this.props.location.state?.campaign
        if (!campaign) return
        let { headerOption, bannerOption, bodyOption, formOption, footerOption, promotionOption } = this.props
        this.setState({
            name: campaign.name,
            header: headerOption.find(item => item.value.id === campaign.headerId),
            banner: bannerOption.find(item => item.value.id === campaign.bannerId),
            body: bodyOption.find(item => item.value.id === campaign.bodyId),
            form: formOption.find(item => item.value.id === campaign.formId),
            footer: footerOption.find(item => item.value.id === campaign.footerId),
            promotion: promotionOption.find(item => item.value.id === campaign.promotionId),
        })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleOnChangeText = (name, e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    handleSave = async () => {
        let type = this.props.params.type
        let { header, banner, body, form, footer, name, promotion } = this.state
        let data = {}, res;
        data.name = name
        data.headerId = header?.value?.id
        data.bannerId = banner?.value?.id
        data.bodyId = body?.value?.id
        data.formId = form?.value?.id
        data.footerId = footer?.value?.id
        data.promotionId = promotion?.value?.id
        if (type === 'update') {
            let { campaign } = this.props.location.state
            data.id = campaign.id
            res = await updateCampaign(data)
        } else {
            res = await createCampaign(data)
        }

        func.ALERT_RES(res) && this.handleNav(-1)
    }

    render() {
        let type = this.props.params.type
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Campaign</h3>
                <div className="row">
                    <form className="col-md-5">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input className="form-control" value={this.state.name}
                                onChange={(e) => this.handleOnChangeText('name', e)} type='text' />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Header</label>
                            <Select value='header' options='headerOption'
                                parent={this} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Banner</label>
                            <Select value='banner' options='bannerOption'
                                parent={this} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Body</label>
                            <Select value='body' options='bodyOption'
                                parent={this} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Form</label>
                            <Select value='form' options='formOption'
                                parent={this} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Footer</label>
                            <Select value='footer' options='footerOption'
                                parent={this} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Promotion</label>
                            <Select value='promotion' options='promotionOption'
                                parent={this} />
                        </div>
                        <button type="button" className={`btn ${type === 'update' ? 'btn-warning' : 'btn-success'} mx-1`}
                            onClick={() => this.handleSave()}>
                            {type === 'update' ? 'Save' : 'Create'}</button>
                        <button type="button" className="btn btn-dark mx-1" onClick={() => this.handleNav(-1)}>Cancel</button>
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        headerOption: state.admin.headerOption,
        bannerOption: state.admin.bannerOption,
        bodyOption: state.admin.bodyOption,
        formOption: state.admin.formOption,
        footerOption: state.admin.footerOption,
        promotionOption: state.admin.promotionOption,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadHeader: () => dispatch(actions.fetchHeader()),
        loadBanner: () => dispatch(actions.fetchBanner()),
        loadBody: (id) => dispatch(actions.fetchBody(id)),
        loadForm: (id) => dispatch(actions.fetchForm(id)),
        loadFooter: (id) => dispatch(actions.fetchFooter(id)),
        loadPromotion: (id) => dispatch(actions.fetchPromotion(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignForm));