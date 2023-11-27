import { Component } from "react";
// import './FAQForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import { createFAQ, updateFAQ } from "services/footerService";
import Select from "components/Select/Select";

let typeOption = [
    { value: 'mobile', label: 'Mobile' },
    { value: 'desktop', label: 'Desktop' },
]

class FAQForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    componentDidMount() {
        this.mapData()
    }

    mapData = () => {
        func.MAP_STATE_ROUTE(this,
            {

            },
            {
                object: 'faq',
                property: ['id', 'name']
            })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onSubmit = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            ['name'],
            {
                func: createFAQ,
                callBack: () => { func.NAV(this, '../faq-list') }
            },
            {
                func: updateFAQ,
                property: ['id'],
                callBack: () => { func.NAV(this, '../faq-list') }
            })
    }

    render() {
        let { type } = this.props.params
        return (
            <div className="image-banner-form">
                <h3>FAQ Form</h3>
                <form className="row">
                    {type === 'update' &&
                        <>
                            <div className="form-group col-md-2">
                                <label>FAQ Id</label>
                                <input className="form-control" value={this.state?.id}
                                    type='text' disabled />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div className="form-group col-md-4">
                        <label>Name</label>
                        <input className="form-control" value={this.state.name}
                            onChange={(e) => func.ONCHANGE_TEXT(this, 'name', e)} type='text' />
                    </div>
                    <div className="w-100"></div>
                    <div class="form-group col-md-6">
                        {component.BUTTON_SUBMIT(this, this.onSubmit)}
                        <button type="button" className="btn btn-dark mx-1"
                            onClick={() => this.handleNav(-1)}
                        >Cancel</button>
                    </div>
                </form >
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // funcReact: () => dispatch(actions.funcRedux())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQForm));