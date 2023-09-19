import { Component } from "react";
import './CreateMenu.scss'
import _ from 'lodash';
import withRouter from "components/withRouter/withRouter";
import { createMenu } from "services/userService";

class CreateMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleNav = (link) => {
        this.props.navigate(link)
    }

    handleSubmit = async () => {
        let res = await createMenu({ name: this.state.name })
        alert(res.errMessage)
        res.errCode === 0 && this.handleNav(-1)
    }

    handleOnChnageText = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <>
                <div className="create-menu-form form-row">
                    <div className="form-group col-4">
                        <input value={this.state.name}
                            className="form-control"
                            placeholder="Enter your Menu's name"
                            onChange={(e) => this.handleOnChnageText('name', e.target.value)}
                        />
                    </div>
                    <div className="form-group col-4">
                        <button className="btn btn-primary mx-1" onClick={() => this.handleSubmit()}>Submit</button>
                        <button className="btn btn-secondary mx-1" onClick={() => this.handleNav(-1)}>Cancel</button>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(CreateMenu);