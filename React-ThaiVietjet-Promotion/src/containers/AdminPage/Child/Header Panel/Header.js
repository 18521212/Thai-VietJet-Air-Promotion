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
                                <li className="nav-item">
                                    <Link className={`nav-link ${(route === 'campaign' || !route) && 'active' || ''}`} to='/admin/campaign'
                                        data-toggle='pill'
                                    // data-toggle='collapse'
                                    // data-target=".navbar-collapse.show"
                                    >
                                        <div
                                            data-toggle='collapse'
                                            data-target=".navbar-collapse.show"
                                        >
                                            Campaign
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${route === 'header' && 'active' || ''}`} to='/admin/header'
                                        data-toggle='pill'
                                    >
                                        <div
                                            data-toggle='collapse'
                                            data-target=".navbar-collapse.show"
                                        >
                                            Header
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${route === 'banner' && 'active' || ''}`} to='/admin/banner'
                                        data-toggle='pill'
                                    >
                                        <div
                                            data-toggle='collapse'
                                            data-target=".navbar-collapse.show"
                                        >
                                            Banner
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${route === 'body' && 'active' || ''}`} to='/admin/body'
                                        data-toggle='pill'
                                    >
                                        <div
                                            data-toggle='collapse'
                                            data-target=".navbar-collapse.show"
                                        >
                                            Body
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className={`nav-link dropdown-toggle ${(route === 'form' || route === 'input') && 'active' || ''}`}
                                        data-toggle="dropdown"
                                        role="button"
                                        id="navbarDropdown"
                                    >
                                        Form
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className={`dropdown-item ${route === 'form' && 'active' || ''}`} to='/admin/form'
                                            data-toggle='pill'
                                        >
                                            <div
                                                data-toggle='collapse'
                                                data-target=".navbar-collapse.show"
                                            >
                                                Form
                                            </div>
                                        </Link>
                                        <Link className={`dropdown-item ${route === 'input' && 'active' || ''}`} to='/admin/input'
                                            data-toggle='pill'
                                        >
                                            <div
                                                data-toggle='collapse'
                                                data-target=".navbar-collapse.show"
                                            >
                                                Input
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className={`nav-link dropdown-toggle 
                                        ${(route === 'footer' || route === 'faq') && 'active' || ''}`}
                                        data-toggle="dropdown"
                                        role="button"
                                        id="navbarDropdown"
                                    >
                                        Footer
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className={`dropdown-item ${route === 'footer' && 'active' || ''}`} to='/admin/footer'
                                            data-toggle='pill'
                                        >
                                            <div
                                                data-toggle='collapse'
                                                data-target=".navbar-collapse.show"
                                            >
                                                Footer
                                            </div>
                                        </Link>
                                        <Link className={`dropdown-item ${route === 'faq' && 'active' || ''}`} to='/admin/faq'
                                            data-toggle='pill'
                                        >
                                            <div
                                                data-toggle='collapse'
                                                data-target=".navbar-collapse.show"
                                            >
                                                FAQ
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${route === 'promotion' && 'active' || ''}`} to='/admin/promotion'
                                        data-toggle='pill'
                                    >
                                        <div
                                            data-toggle='collapse'
                                            data-target=".navbar-collapse.show"
                                        >
                                            Promotion
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a
                                        className={`nav-link dropdown-toggle 
                                        ${(route === 'markdown') && 'active' || ''}`}
                                        data-toggle="dropdown"
                                        role="button"
                                        id="navbarDropdown"
                                    >
                                        Global
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className={`dropdown-item ${route === 'markdown' && 'active' || ''}`} to='/admin/markdown'
                                            data-toggle='pill'
                                        >
                                            <div
                                                data-toggle='collapse'
                                                data-target=".navbar-collapse.show"
                                            >
                                                Markdown
                                            </div>
                                        </Link>
                                    </div>
                                </li>
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