import { Component } from 'react';
import './App.scss';
import Header from './HomePage/Header/Header';
import Banner from './HomePage/Banner/Banner';
import Body from './HomePage/Body/Body';
import Form from './HomePage/Form/Form';
import Footer from './HomePage/Footer/Footer';

class App extends Component {
    componentDidMount() {
        document.title = "VietjetAir - Gift Voucher dev"
    }

    render() {
        return (
            <>
                <Header />
                <Banner />
                <Body />
                <section className="join-us" id="register-purchase">
                    <Form />
                    <Footer />
                </section>
            </>
        )
    }
}

export default App;
