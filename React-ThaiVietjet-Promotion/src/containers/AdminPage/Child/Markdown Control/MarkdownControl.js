import { Component } from "react";
// import './MarkdownControl.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import {
    Routes,
    Route,
} from "react-router-dom";
import MarkdownForm from "./Markdown Form/MarkdownForm";
import MarkdownList from "./Markdown List/MarkdownList";

class MarkdownControl extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <h3>Markdown Section</h3>
                    <hr></hr>
                    <Routes>
                        <Route path='*' element={<MarkdownList />}></Route>
                        <Route path='markdown-form/:type?' element={<MarkdownForm />}></Route>
                    </Routes>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MarkdownControl));