import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import IntlProviderWrapper from "./hoc/IntlProviderWrapper";

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

const root = ReactDOM.createRoot( document.getElementById('root'));
root.render(
    <Provider store={reduxStore}>
        <IntlProviderWrapper>
            <BrowserRouter>
                <App persistor={persistor} />
            </BrowserRouter>
        </IntlProviderWrapper>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals