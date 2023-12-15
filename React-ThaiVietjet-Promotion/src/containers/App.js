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
import PaymentPage from './PaymentPage/PaymentPage';
import DataFeed from './DataFeed/DataFeed';

function App() {
    return (
        <>
            <Routes>
                <Route path="/:id?" element={<HomePage />} />
                <Route path="/admin/*" element={<AdminPage />} />
                <Route path="/payment/*" element={<PaymentPage />} />
                <Route path="/datafeed/*" element={<DataFeed />} />
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

export default App;
