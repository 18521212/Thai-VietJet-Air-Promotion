import { Component } from "react";
// import './QAForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import { createFAQQuestion, updateFAQQuestion } from "services/footerService";
import Select from "components/Select/Select";

let typeOption = [
    { value: 'mobile', label: 'Mobile' },
    { value: 'desktop', label: 'Desktop' },
]

class QAForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            question: '',
            answer: '',
        }
    }

    componentDidMount() {
        this.mapData()
    }

    mapData = () => {
        func.MAP_STATE_ROUTE(this,
            {
                object: 'faq',
                property: [{ key1: 'FAQId', key2: 'id' }]
            },
            {
                object: 'faqquestion',
                property: ['id', 'FAQId', 'question', 'answer']
            })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onSubmit = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            ['FAQId', 'question', 'answer'],
            {
                func: createFAQQuestion,
                callBack: () => { func.NAV(this, '../faqquestion-list', { faq: this.props.location.state?.faq }) }
            },
            {
                func: updateFAQQuestion,
                property: ['id'],
                callBack: () => { func.NAV(this, '../faqquestion-list', { faq: this.props.location.state?.faq }) }
            })
    }

    render() {
        let { type } = this.props.params
        return (
            <div className="image-banner-form">
                <h3>Question & Answer Form</h3>
                <form className="row">
                    <div className="form-group col-md-2">
                        <label>FAQ Id</label>
                        <input className="form-control" value={this.state?.FAQId}
                            type='text' disabled />
                    </div>
                    <div className="w-100"></div>
                    {type === 'update' &&
                        <>
                            <div className="form-group col-md-2">
                                <label>FAQ Question Id</label>
                                <input className="form-control" value={this.state?.id}
                                    type='text' disabled />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div className="w-100"></div>
                    <div class="form-group col-md-4">
                        <label>Question</label>
                        <textarea class="form-control" rows="3"
                            value={this.state?.question}
                            onChange={(e) => func.ONCHANGE_TEXT(this, 'question', e)}
                        ></textarea>
                    </div>
                    <div class="form-group col-md-12">
                        <label>Answer</label>
                        <textarea class="form-control" rows="3"
                            value={this.state?.answer}
                            onChange={(e) => func.ONCHANGE_TEXT(this, 'answer', e)}
                        ></textarea>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QAForm));