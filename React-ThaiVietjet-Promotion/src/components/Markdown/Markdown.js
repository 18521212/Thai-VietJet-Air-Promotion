import { Component } from "react";
// import './Markdown.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// issue onChange

class Markdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentEn: '',
            markdownEn: '',
        }
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    handleEditorChange = ({ html, text }, name) => {
        let parent = this.props?.parent
        parent.setState({
            ['content' + name]: html,
            ['markdown' + name]: text
        })
    }

    render() {
        let name = this.props?.name
        let parent = this.props?.parent
        return (
            <>
                {parent && name &&
                    _.isString(parent.state[`markdown${name}`]) &&
                    _.isString(parent.state[`content${name}`]) &&
                    < MdEditor
                        style={{ height: '400px', ...this.props?.style }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={({ html, text }) => { this.handleEditorChange({ html, text }, name) }}
                        value={parent.state[`markdown${name}`]}
                    />
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Markdown));