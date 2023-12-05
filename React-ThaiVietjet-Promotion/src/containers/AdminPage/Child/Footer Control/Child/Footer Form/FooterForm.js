import { Component } from "react";
import './FooterForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { createFooter, updateFooter } from "services/footerService";
import { func, component } from 'utils'
import Select from "components/Select/Select";

class FooterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedTerm: '',
            selectedHowToUse: '',
            selectedFAQ: '',
        }
    }

    componentDidMount() {
        this.mapStateUpdate()
        this.loadData()
    }

    loadData = async () => {
        await this.props.loadMarkdown()
        await this.props.loadFAQ()
        if (this.props.params.type === 'update') {
            this.mapStateSelect('selectedTerm', this.props.markdownOption, 'id', this.props.location.state.footer.term_and_condition)
            this.mapStateSelect('selectedHowToUse', this.props.markdownOption, 'id', this.props.location.state.footer.how_to_use)
            this.mapStateSelect('selectedFAQ', this.props.faqOption, 'id', this.props.location.state.footer.faq)
        }
    }

    mapStateUpdate = () => {
        func.MAP_STATE_ROUTE(this, {}, {
            object: 'footer',
            property: ['id']
        })
        func.MAP_STATE_UPDATE(this, this.props.location.state?.footer)
    }

    mapStateSelect = (name, option, keyOption, value) => {
        this.setState({
            [name]: option.filter(item => item.value?.[keyOption] === value)[0]
        })
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleCreate = async () => {
        let { type } = this.props.params
        let { name, selectedTerm, selectedHowToUse, selectedFAQ } = this.state
        let data = {}, res
        data.name = name
        data.term_and_condition = selectedTerm?.value?.id ? selectedTerm.value.id : null
        data.how_to_use = selectedHowToUse?.value?.id ? selectedHowToUse.value.id : null
        data.faq = selectedFAQ?.value?.id ? selectedFAQ.value.id : null
        if (type === 'update') {
            let { footer } = this.props.location.state
            data.id = footer.id
            res = await updateFooter(data)
        } else {
            res = await createFooter(data)
        }
        func.ALERT_RES(res) && this.handleNav(-1)
    }

    render() {
        let type = this.props.params?.type
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Footer</h3>
                <div className="row">
                    {type === 'update' &&
                        <>
                            <div className="form-group col-md-2">
                                <label for="exampleInputEmail1">Footer Id</label>
                                <input className="form-control" value={this.state?.id}
                                    type='text' disabled />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div class="form-group col-4">
                        <label for="id">Name</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.name}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'name', event)}
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div class="form-group col-md-3">
                        <label for="id">Term And Condition</label>
                        <Select
                            value='selectedTerm'
                            options='markdownOption'
                            parent={this}
                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label for="id">How To Use</label>
                        <Select
                            value='selectedHowToUse'
                            options='markdownOption'
                            parent={this}
                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label for="id">FAQ</label>
                        <Select
                            value='selectedFAQ'
                            options='faqOption'
                            parent={this}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="button"
                            className={`btn ${type === 'update' ?
                                'btn-warning' : 'btn-success'} mr-1`}
                            onClick={() => this.handleCreate()}
                        >
                            {type === 'update' ? 'Save' : 'Submit'}
                        </button>
                        <button type="button" className="btn btn-secondary mx-1"
                            onClick={() => this.handleNav(-1)}>Cancel</button>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        markdowns: state.admin.markdowns,
        markdownOption: state.admin.markdownOption,
        faqOption: state.admin.faqOption,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMarkdown: (id) => dispatch(actions.fetchMarkdown(id)),
        loadFAQ: (id) => dispatch(actions.fetchFAQ(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterForm));