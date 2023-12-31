import { Component } from "react";
// import './PackForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import { createPack, updatePack } from "services/promotionService";
import Select from "components/Select/Select";

class PackForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCurrency: { value: 'THB', label: 'THB' },
            currencyOption: [
                { value: 'THB', label: 'THB' },
                { value: 'USD', label: 'USD' }
            ],
            selectedMarkdown: '',
        }
    }

    componentDidMount() {
        this.mapStateRoute()
        this.loadData()
    }

    loadData = async () => {
        await this.props.loadMarkdown()
        if (this.props.params.type === 'update') {
            this.mapStateSelect('selectedMarkdown', this.props.markdownOption, 'id', this.props.location.state.pack?.markdownId)
        }
    }

    mapStateSelect = (name, option, keyOption, value) => {
        this.setState({
            [name]: option.filter(item => item.value?.[keyOption] === value)[0]
        })
    }

    mapStateRoute = () => {
        func.MAP_STATE_ROUTE(this,
            {
                object: 'promotion',
                property: [{ key1: 'promotionId', key2: 'id' }]
            },
            {
                object: 'pack',
                property: ['promotionId', 'id', 'name', 'price', 'currency', 'maxNumber', 'vat']
            }
        )
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onCreate = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            ['promotionId', 'name', 'price', 'maxNumber', 'currency', 'vat',
                { key: 'markdownId', property: ['selectedMarkdown', 'value', 'id'] }
            ],
            {
                func: createPack,
                callBack: () => { func.NAV(this, -1) }
            },
            {
                func: updatePack,
                property: ['id'],
                callBack: () => { func.NAV(this, -1) }
            }
        )
    }

    render() {
        let type = this.props.params?.type
        console.log('s', this.state.selectedMarkdown)
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Pack</h3>
                <div className="row">
                    <div class="form-group col-md-2">
                        <label for="id">{'Id (Promotion Id)'}</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.promotionId} disabled
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'promotionId', event)}
                        />
                    </div>
                    {type === 'update' &&
                        <div class="form-group col-md-2">
                            <label for="id">{'Id (Pack Id)'}</label>
                            <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                value={this.state.id} disabled
                                onChange={(event) => func.ONCHANGE_TEXT(this, 'id', event)}
                            />
                        </div>
                    }
                    <div class="form-group col-md-2">
                        <label for="id">Name</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.name}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'name', event)}
                        />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="id">Price</label>
                        <input type="number" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.price}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'price', event)}
                        />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="id">VAT</label>
                        <input type="number" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.vat}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'vat', event)}
                        />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="id">Max Number</label>
                        <input type="number" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.maxNumber}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'maxNumber', event)}
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label for="id">Currency</label>
                        <Select
                            value='selectedCurrency'
                            options='currencyOption'
                            typeSelect='state'
                            parent={this}
                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label for="id">Markdown</label>
                        <Select
                            value='selectedMarkdown'
                            options='markdownOption'
                            parent={this}
                        />
                    </div>
                </div>
                <div className="row px-3">
                    {component.BUTTON_SUBMIT(this, this.onCreate, 'mr-2')}
                    <button
                        className="btn btn-dark mr-auto"
                        onClick={() => func.NAV(this, -1)}
                    >
                        Cancel
                    </button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        markdowns: state.admin.markdowns,
        markdownOption: state.admin.markdownOption,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMarkdown: (id) => dispatch(actions.fetchMarkdown(id)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PackForm));