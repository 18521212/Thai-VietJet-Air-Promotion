import { Component } from "react";
import './CreateMenu.scss'
import _ from 'lodash';
import { connect } from 'react-redux'
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter";
import { createMenu, updateMenu } from "services/headerService";
import { component, func } from 'utils'

class CreateMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidMount(){
        this.mapData()
    }
    mapData = () => {
        func.MAP_STATE_ROUTE(this, {}, {
            object: 'menu',
            property: ['name']
        })
    }

    handleNav = (link) => {
        this.props.navigate(link)
    }

    handleSubmit = async () => {
        let { type } = this.props.params;
        let { name } = this.state
        let res
        if (!type) {
            res = await createMenu({ name: name })
            alert(res.errMessage)
            // this.props.loadMenu()
        } else if (type === 'update') {
            let menuId = this.props.location.state.menuId
            res = await updateMenu({ id: menuId, name: name })
            alert(res.errMessage)
        }
        res && res.errCode === 0 && this.handleNav(-1)
    }

    handleOnChnageText = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        let { type } = this.props.params
        let menuId = this.props.location.state?.menuId
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Menu</h3>
                <div className="create-menu-form form-row">
                    {type === 'update' &&
                        <>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Menu Id</label>
                                <input className="form-control" value={menuId}
                                    type='text' disabled />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div className="form-group col-4">
                        <input value={this.state.name}
                            className="form-control"
                            placeholder="Enter your Menu's name"
                            onChange={(e) => this.handleOnChnageText('name', e.target.value)}
                        />
                    </div>
                    <div className="form-group col-4">
                        <button className={`btn ${type === 'update' ? 'btn-warning' : 'btn-primary'} mx-1`}
                            onClick={() => this.handleSubmit()}>
                            {type === 'update' ? 'Save' : 'Submit'}</button>
                        <button className="btn btn-dark mx-1" onClick={() => this.handleNav(-1)}>Cancel</button>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuData: state.admin.menus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMenu: () => dispatch(actions.fetchMenu())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateMenu));