import { Component } from 'react';
import './AdminPage.scss';

import Header from './Child/Header Panel/Header';
import Campaign from './Child/Campaign/Campaign';

import HeaderControl from './Child/Header Control/HeaderControl';

import {
    Routes,
    Route,
} from "react-router-dom";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        document.title = 'System Admin'
    }

    render() {
        return (
            <>
                <Header />
                <Routes>
                    <Route path="/campaign" element={<Campaign />} />
                    <Route path="/header" element={<HeaderControl />} />
                </Routes>
            </>
        )
    }
}

export default AdminPage;
