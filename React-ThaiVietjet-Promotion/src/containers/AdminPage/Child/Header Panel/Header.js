import { Component } from "react";
import './Header.scss'
import _ from 'lodash';
import logo from '../../../../assets/Logo/skyfun_logo.png';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container-fluid p-0">
                <div className="row">
                    <header
                        className="header-admin col-12"
                    >
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid sticky-top">
                            <a className="navbar-brand" href='#'>
                                <img src={logo} alt='logo' />
                            </a>
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
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item"><Link className="nav-link" to='/admin/campaign'>Campaign</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to='/admin/header'>Header</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to='/admin/banner'>Banner</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to='/admin/body'>Body</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to='/admin/form'>Form Section</Link></li>
                                    <li className="nav-item"><Link className="nav-link" to='/admin/footer'>Footer</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </div>
            </div>
        )
    }
}

export default Header;