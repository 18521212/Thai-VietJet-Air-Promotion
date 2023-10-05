import { Component } from "react";
import './BodyForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { func } from 'utils'
import { createBody, updateBody } from "services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class BodyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contentEn: '',
            contentTh: '',
            markdownEn: '',
            markdownTh: '',
            e: '',
            type: this.props?.params?.type,
        }
    }

    componentDidMount() {
        this.mapDataUpdate()
    }

    mapDataUpdate = () => {
        let body = this.props?.location?.state?.body
        body && func.MAP_STATE_UPDATE(this, body)
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleEditorChange = ({ html, text }, name) => {
        this.setState({
            ['content' + name]: html,
            ['markdown' + name]: text
        })
    }

    handleSubmit = () => {
        let data = {}
        let { type, id, name, contentEn, contentTh, markdownEn, markdownTh } = this.state
        data.name = name
        data.contentEn = contentEn
        data.contentTh = contentTh
        data.markdownEn = markdownEn
        data.markdownTh = markdownTh
        if (type === 'update') {
            data.id = id
            func.HANDLE_CREATE_UPDATE(data, updateBody, () => { func.NAV(this, -1) })
        } else {
            func.HANDLE_CREATE_UPDATE(data, createBody, () => { func.NAV(this, -1) })
        }
    }

    render() {
        console.log('st', this.state)
        let { type } = this.state
        return (
            <>
                <h3>Body Form</h3>
                <h4>Content English</h4>
                <div className="row">
                    <div className="form-group col-md-4">
                        <label for="exampleInputEmail1">Name</label>
                        <input className="form-control" value={this.state.name}
                            onChange={(e) => func.ONCHANGE_TEXT(this, 'name', e)} type='text' />
                    </div>
                </div>
                <MdEditor
                    style={{ height: '300px' }}
                    renderHTML={text => mdParser.render(text)}
                    name='En'
                    onChange={({ html, text }) => this.handleEditorChange({ html, text }, 'En')}
                    value={this.state.markdownEn}
                />
                <h4>Content Thai</h4>
                <MdEditor
                    style={{ height: '300px' }}
                    renderHTML={text => mdParser.render(text)}
                    name='Th'
                    onChange={({ html, text }) => this.handleEditorChange({ html, text }, 'Th')}
                    value={this.state.markdownTh}
                />
                <div className="row mt-2">
                    <div className="col-12">
                        <button
                            className={`btn ${type === 'update' ? `btn-warning` : `btn-success`} mr-1`}
                            onClick={() => this.handleSubmit()}
                        >
                            {type === 'update' ? `Save` : `Create`}</button>
                        <button className="btn btn-secondary ml-1"
                            onClick={() => { func.NAV(this, -1) }}>Cancel</button>
                    </div>
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BodyForm));