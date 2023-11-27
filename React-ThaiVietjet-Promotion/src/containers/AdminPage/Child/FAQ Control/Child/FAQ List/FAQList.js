import { Component } from "react";
// import './FAQList.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table"
import { func, api, association } from 'utils'
import { deleteFAQ } from "services/footerService";

class FAQList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        await this.props.loadFAQ()
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onDelete = (data) => {
        func.HANDLE_DELETE('Delete this FAQ?', data, deleteFAQ, this.props.loadFAQ)
    }

    render() {
        let { faqs } = this.props
        return (
            <>
                <h3>FAQs</h3>
                <div className="row my-1 px-3">
                    <button className="btn btn-success ml-auto"
                        onClick={() => func.NAV(this, '../faq-form')}>Create</button>
                </div>
                <Table
                    data={faqs?.data}
                    thead={['Id', 'Name']}
                    tbody={['id', 'name']}
                    actions={(data) =>
                        <>
                            {data[association.FAQ_FAQID].length > 0 ?
                                <button type="button" className="btn btn-primary mx-1"
                                    onClick={() => func.NAV(this, '../faqquestion-list', { faq: data })}
                                >View Q&As</button>
                                :
                                <button type="button" className="btn btn-success mx-1"
                                    onClick={() => func.NAV(this, '../faqquestion-form', { faq: data })}
                                >Add Q&As</button>
                            }
                            <button type="button" className="btn btn-warning mx-1"
                                onClick={() => func.NAV(this, '../faq-form/update', { faq: data })}
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
        faqs: state.admin.faqs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // loadFooterText: (footerId) => dispatch(actions.fetchFooterText(footerId))
        loadFAQ: (id) => dispatch(actions.fetchFAQ(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FAQList));