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
            <>
                <header
                    className="header-admin"
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
                                <li className="nav-item"><Link className="nav-link">Banner</Link></li>
                                <li className="nav-item"><Link className="nav-link">Body</Link></li>
                                <li className="nav-item"><Link className="nav-link">Form Section</Link></li>
                                <li className="nav-item"><Link className="nav-link">Footer</Link></li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </>
        )
    }
}

export default Header;