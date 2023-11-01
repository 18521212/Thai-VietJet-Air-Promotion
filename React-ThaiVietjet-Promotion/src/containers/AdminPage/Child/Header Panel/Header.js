import { Component } from "react";
import './Header.scss'
import _ from 'lodash';
import logo from '../../../../assets/Logo/skyfun_logo.png';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from 'store/actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    signOut = () => {
        this.props.clearUser()
        this.props.signOut()
    }

    render() {
        return (
            <header
                className="header-admin"
            >
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid sticky-top">
                    <Link className="navbar-brand" to='/admin'>
                        <img src={logo} alt='logo' />
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
                            <li className="nav-item">
                                <Link className="nav-link active" to='/admin/campaign'
                                    data-toggle='pill'
                                >Campaign</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/header'
                                    data-toggle='pill'
                                >Header</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/banner'
                                    data-toggle='pill'
                                >Banner</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/body'
                                    data-toggle='pill'
                                >Body</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                    role="button"
                                    id="navbarDropdown"
                                >Form</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to='/admin/form'
                                        data-toggle='pill'
                                    >Form</Link>
                                    <Link className="dropdown-item" to='/admin/input'
                                        data-toggle='pill'
                                    >Input</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/footer'
                                    data-toggle='pill'
                                >Footer</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/promotion'
                                    data-toggle='pill'
                                >Promotion</Link>
                            </li>
                        </ul>
                        <button className="btn btn-warning mr-1" onClick={() => this.signOut()}>Sign Out</button>
                    </div>
                </nav>
                <div className="row mx-0 px-3">
                    <span style={{ color: 'black' }} className="ml-auto">Hello Username: {this.props?.user?.username}</span>
                </div>
            </header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);