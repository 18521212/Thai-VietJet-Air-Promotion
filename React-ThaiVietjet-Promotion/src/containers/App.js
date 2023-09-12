import { Component } from 'react';

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
            </>
        )
    }
}

export default App;
