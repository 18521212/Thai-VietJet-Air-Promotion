import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Routes,
    Route,
    Outlet,
    Link,
    useMatch,
    useResolvedPath,
} from "react-router-dom";

import './App.scss';

import HomePage from './HomePage/HomePage';
import AdminPage from './AdminPage/AdminPage';

class App extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <>
                <Routes>
                    <Route path="/*" element={<HomePage />} />
                    <Route path="/admin/*" element={<AdminPage />} />
                </Routes>

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </>
        )
    }
}

export default App;
