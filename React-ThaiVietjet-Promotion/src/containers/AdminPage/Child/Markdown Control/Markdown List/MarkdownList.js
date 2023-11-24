import { Component } from "react";
// import './MarkdownList.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table";
import Select from "components/Select/Select";
import { func, association } from 'utils'
import { deleteMarkdown } from "services/footerService";

class MarkdownList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    componentDidMount() {
        this.loadData()
        // this.mapData()
    }

    mapData = () => {
        func.MAP_STATE_ROUTE(this, {
            object: 'banner',
            property: ['id']
        }, {})
    }

    loadData = async () => {
        await this.props.loadMarkdown()
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onDelete = (data) => {
        func.HANDLE_DELETE('Delete this Image?', data, deleteMarkdown, () => { this.loadData() })
    }

    render() {
        let data = this.props?.markdowns?.data
        return (
            <>
                <h3>Markdowns</h3>
                <div className="row mx-0">
                    <button type="button" className="btn btn-success mx-1 mb-1 ml-auto"
                        onClick={() => func.NAV(this, '../markdown-form')}
                    >Add Markdown</button>
                </div>
                {data &&
                    <div className="row mx-0">
                        <Table
                            data={data}
                            thead={['Id', 'Title English']}
                            tbody={['id', 'titleEn']}
                            actions={(data) =>
                                <>
                                    <button type="button" className="btn btn-warning mx-1"
                                        onClick={() => func.NAV(this, '../markdown-form/update', { markdown: data })}
                                    >Update</button>
                                    <button type="button" className="btn btn-danger mx-1"
                                        onClick={() => this.onDelete(data)}
                                    >Delete</button>
                                </>
                            }
                        />
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        markdowns: state.admin?.markdowns
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMarkdown: (id) => dispatch(actions.fetchMarkdown(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarkdownList));