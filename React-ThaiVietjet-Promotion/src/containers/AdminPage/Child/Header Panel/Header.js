import { Component } from "react";
import './Header.scss'
import _ from 'lodash';
import logo from '../../../../assets/Logo/skyfun_logo.png';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.menu = [
            { text: 'Campaign', route: 'campaign', type: '' },
            { text: 'Header', route: 'header', type: '' },
            { text: 'Banner', route: 'banner', type: '' },
            { text: 'Body', route: 'body', type: '' },
            {
                text: 'Form', type: 'dropdown',
                sub_route: [
                    { text: 'Form', route: 'form' },
                    { text: 'Input', route: 'input' },
                ]
            },
            { text: 'Promotion', route: 'promotion', type: '' },
            {
                text: 'Global', type: 'dropdown',
                sub_route: [
                    { text: 'Markdown', route: 'markdown' },
                ]
            },
        ]
    }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.location.pathname!==this.props.location.pathname){
    //         console.log('r',this.props.location.pathname)
    //     }
    // }

    signOut = () => {
        this.props.clearUser()
        this.props.signOut()
    }

    render() {
        let route = this.props.location.pathname.split('/', 3)[2]
        return (
            <>

                <header
                    className="header-admin"
                >
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid sticky-top">
                        <Link className="navbar-brand" to='/admin'>
                            <img className="logo" src={logo} alt='logo' />
                        </Link>
                        <button
                            className="navbar-toggler col-2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav navbar-nav mr-auto nav-pills"
                            >
                                {this.menu.map((item, index) => {
                                    let _component
                                    let _type = item.type
                                    if (_type == '') {
                                        _component =
                                            <li className="nav-item" index={index}>
                                                <Link className={`nav-link ${(route === item.route || !route) && 'active' || ''}`} to={`/admin/${item.route}`}
                                                    data-toggle='pill'
                                                // data-toggle='collapse'
                                                // data-target=".navbar-collapse.show"
                                                >
                                                    <div
                                                        data-toggle='collapse'
                                                        data-target=".navbar-collapse.show"
                                                    >
                                                        {item.text}
                                                    </div>
                                                </Link>
                                            </li>
                                    } else if (_type = 'dropdown') {
                                        _component =
                                            <li className="nav-item dropdown" index={index}>
                                                <a
                                                    className={`nav-link dropdown-toggle ${item.sub_route.map(i => i.route).includes(route) && 'active' || ''}`}
                                                    data-toggle="dropdown"
                                                    role="button"
                                                    id="navbarDropdown"
                                                >
                                                    {item.text}
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    {item.sub_route.map((s_item, s_index) => {
                                                        return (
                                                            <Link className={`dropdown-item ${route === s_item.route && 'active' || ''}`} to={`/admin/${s_item.route}`}
                                                                data-toggle='pill' index={s_index}
                                                            >
                                                                <div
                                                                    data-toggle='collapse'
                                                                    data-target=".navbar-collapse.show"
                                                                >
                                                                    {s_item.text}
                                                                </div>
                                                            </Link>
                                                        )
                                                    })}
                                                </div>
                                            </li>
                                    }
                                    return (
                                        _component
                                    )
                                })}
                            </ul>
                            <button className="btn btn-warning mr-1" onClick={() => this.signOut()}>Sign Out</button>
                        </div>
                    </nav>
                </header>
                <div className="row mx-0 px-3">
                    <span style={{ color: 'black' }} className="ml-auto">Hello Username: {this.props?.user?.username}</span>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.admin.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearUser: () => { dispatch(actions.clearUser()) }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));