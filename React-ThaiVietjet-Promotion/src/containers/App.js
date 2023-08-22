import { Component } from 'react';
import './App.scss';
import Header from './HomePage/Header/Header';
import Body from './HomePage/Body/Body';
import Footer from './HomePage/Footer/Footer';

class App extends Component {
    render() {
        return (
            <>
                <Header />
                <Body />
            </>
        )
    }
}

export default App;
