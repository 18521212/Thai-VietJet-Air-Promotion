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
    Navigate,
} from "react-router-dom";
import './App.scss';
import HomePage from './HomePage/HomePage';
import AdminPage from './AdminPage/AdminPage';
import PaymentPage from './PaymentPage/PaymentPage';
import { json } from "react-router-dom";

let data = {
    "status": 200,
    "message": "blabla.."
}

const jsonData = () => {
    return JSON.parse(data)
}

function loader({ request, params }) {
    const data = { some: "thing" };
    return json(data, { status: 200 });
}

function App() {
    return (
        <>
            <Routes>
                <Route path="/:id?" element={<HomePage />} />
                <Route path="/admin/*" element={<AdminPage />} />
                <Route path="/payment/*" element={<PaymentPage />} />
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
