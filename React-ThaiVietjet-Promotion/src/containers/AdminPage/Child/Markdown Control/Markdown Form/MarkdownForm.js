import { Component } from "react";
// import './MarkdownForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { createMarkdown, updateMarkdown } from "services/footerService";
import { func, component } from 'utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class MarkdownForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            titleEn: '',
            titleTh: '',
            contentEn: '',
            markdownEn: '',
            contentTh: '',
            markdownTh: '',
        }
    }

    componentDidMount() {
        this.mapStateUpdate()
    }

    mapStateUpdate = () => {
        func.MAP_STATE_ROUTE(this, {}, {
            object: 'markdown',
            property: ['id', 'titleEn', 'titleTh', 'contentEn', 'contentTh', 'markdownEn', 'markdownTh']
        })
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleEditorChange = ({ html, text }, name) => {
        this.setState({
            ['content' + name]: html,
            ['markdown' + name]: text
        })
    }

    onSumit = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            ['name', 'titleEn', 'titleTh', 'contentEn', 'contentTh', 'markdownEn', 'markdownTh'],
            {
                func: createMarkdown,
                callBack: () => { func.NAV(this, -1) }
            },
            {
                func: updateMarkdown,
                property: ['id'],
                callBack: () => { func.NAV(this, -1) }
            }
        )
    }

    render() {
        let type = this.props.params?.type
        console.log('t', this.state)
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Markdown</h3>
                <div className="row">
                    {/* {type === 'update' &&
                        <>
                            <div className="form-group col-md-2">
                                <label for="exampleInputEmail1">Footer Id</label>
                                <input className="form-control" value={this.state?.id}
                                    type='text' disabled />
                            </div>
                            <div className="w-100"></div>
                        </>
                    } */}
                    <div class="form-group col-4">
                        <label for="id">Title English</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.titleEn}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'titleEn', event)}
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>

                    <div className="w-100"></div>
                    <div className="form-group col">
                        <label for="id">Content English</label>
                        <MdEditor
                            style={{ height: '350px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={({ html, text }) => this.handleEditorChange({ html, text }, 'En')}
                            value={this.state.markdownEn}
                        />
                    </div>
                    <div className="w-100"></div>
                    <div class="form-group col-4">
                        <label for="id">Title Thai</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.titleTh}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'titleTh', event)}
                        />
                    </div>
                    <div className="w-100"></div>
                    <div className="form-group col">
                        <label for="id">Content English</label>
                        <MdEditor
                            style={{ height: '350px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={({ html, text }) => this.handleEditorChange({ html, text }, 'Th')}
                            value={this.state.markdownTh}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {component.BUTTON_SUBMIT(this, this.onSumit)}
                        <button type="button" className="btn btn-dark mx-1"
                            onClick={() => func.NAV(this, '../../markdown')}>Cancel</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarkdownForm));