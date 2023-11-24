import { Component } from "react";
import './BodySelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Table from "components/Table/Table";
import { func } from 'utils'
import { deleteBody } from "services/bodyService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
    // console.log('handleEditorChange', html, text);
}

class BodySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.loadBody()
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleCreate = () => {
        func.NAV(this, '../body-form')
    }

    handleUpdate = (data) => {
        this.handleNav('../body-form/update', { body: data })
    }

    handleDelete = (data) => {
        func.HANDLE_DELETE('Delete this item?', { id: data.id }, deleteBody, this.props.loadBody)
    }

    render() {
        let { bodys } = this.props
        return (
            <>
                <h3>Bodys</h3>
                <div className="row my-1 px-3">
                    <button className="btn btn-success ml-auto"
                        onClick={() => this.handleCreate()}>Create</button>
                </div>
                <Table
                    data={bodys.data}
                    thead={['Id', 'Name']}
                    tbody={['id', 'name']}
                    actions={(data) =>
                        <>
                            <button type="button" className="btn btn-success mx-1"
                                onClick={() => func.NAV(this, '../body-detail', { body: data })}>View</button>
                            <button type="button" className="btn btn-warning mx-1"
                                onClick={() => this.handleUpdate(data)}>Update</button>
                            <button type="button" className="btn btn-danger mx-1"
                                onClick={() => this.handleDelete(data)}>Delete</button>
                        </>
                    }
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        bodys: state.admin.bodys
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadBody: () => dispatch(actions.fetchBody())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BodySelect));