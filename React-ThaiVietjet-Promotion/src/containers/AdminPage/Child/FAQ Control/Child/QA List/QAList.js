import { Component } from "react";
// import './QAList.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table"
import { func, api, association } from 'utils'
import { deleteFAQQuestion } from "services/footerService";

class QAList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        let faq = this.props.location.state?.faq
        faq && await this.props.loadFAQ(faq.id)
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onDelete = (data) => {
        func.HANDLE_DELETE('Delete this FAQ?', data, deleteFAQQuestion, this.loadData)
    }

    render() {
        let { faq } = this.props
        return (
            <>
                <h3>Question & Answer</h3>
                <div className="row my-1 px-3">
                    <button className="btn btn-primary mr-auto"
                        onClick={() => func.NAV(this, '../../faq')}
                    >Back</button>
                    <button className="btn btn-success ml-auto"
                        onClick={() => func.NAV(this, '../faqquestion-form', { faq: this.props.location.state?.faq })}>Create Q&A</button>
                </div>
                <Table
                    data={faq?.data?.[association.FAQ_FAQID]}
                    thead={['Id', 'Question', 'Answer']}
                    tbody={['id', 'question', 'answer']}
                    actions={(data) =>
                        <>
                            <button type="button" className="btn btn-warning mx-1"
                                onClick={() => func.NAV(this, '../faqquestion-form/update', { faqquestion: data, faq: this.props.location.state?.faq })}
                            >Update</button>
                            <button type="button" className="btn btn-danger mx-1"
                                onClick={() => this.onDelete(data)}
                            >Delete</button>
                        </>
                    }
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        faq: state.admin.faq
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // loadFooterText: (footerId) => dispatch(actions.fetchFooterText(footerId))
        loadFAQ: (id) => dispatch(actions.fetchFAQ(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QAList));