import { Component } from "react"
import './CampaignForm.scss'
import _, { head } from 'lodash'
import Select from "components/Select/Select"
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { updateCampaign } from "services/userService"
import { func } from 'utils'

class CampaignForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            banner: '',
            body: '',
            form: '',
            footer: ''
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
        this.mapDataOption()
    }

    mapDataOption = () => {
        let { campaign } = this.props.location.state
        let { headerOption, bannerOption, bodyOption, formOption, footerOption } = this.props
        this.setState({
            header: headerOption.find(item => item.value.id === campaign.headerId),
            banner: bannerOption.find(item => item.value.id === campaign.bannerId),
            body: bodyOption.find(item => item.value.id === campaign.bodyId),
            form: formOption.find(item => item.value.id === campaign.formId),
            footer: footerOption.find(item => item.value.id === campaign.footerId),
        })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleSave = async () => {
        let { campaign } = this.props.location.state
        let { header, banner, body, form, footer } = this.state
        let data = {};
        data.id = campaign.id
        data.headerId = header?.value?.id
        data.bannerId = banner?.value?.id
        data.bodyId = body?.value?.id
        data.formId = form?.value?.id
        data.footerId = footer?.value?.id
        let res = await updateCampaign(data)
        func.ALERT_RES(res) && this.handleNav(-1)
    }

    render() {
        return (
            <>
                <h3>Campaign form</h3>
                <div className="row">
                    <form className="col-md-5">
                        <div className="form-group">
                            <label for="exampleInputEmail1">Header</label>
                            <Select name='header' value={this.state.header} options={this.props.headerOption}
                                onChange={this.handleOnChangeSelect} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Banner</label>
                            <Select name='banner' value={this.state.banner} options={this.props.bannerOption}
                                onChange={this.handleOnChangeSelect} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Body</label>
                            <Select name='body' value={this.state.body} options={this.props.bodyOption}
                                onChange={this.handleOnChangeSelect} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Form</label>
                            <Select name='form' value={this.state.form} options={this.props.formOption}
                                onChange={this.handleOnChangeSelect} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Footer</label>
                            <Select name='footer' value={this.state.footer} options={this.props.footerOption}
                                onChange={this.handleOnChangeSelect} />
                        </div>
                        <button type="button" className="btn btn-warning mx-1" onClick={() => this.handleSave()}>Save</button>
                        <button type="button" className="btn btn-secondary mx-1" onClick={() => this.handleNav(-1)}>Cancel</button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadHeader: () => dispatch(actions.fetchHeader()),
        loadBanner: () => dispatch(actions.fetchBanner()),
        loadBody: (id) => dispatch(actions.fetchBody(id)),
        loadForm: (id) => dispatch(actions.fetchForm(id)),
        loadFooter: (id) => dispatch(actions.fetchFooter(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignForm));