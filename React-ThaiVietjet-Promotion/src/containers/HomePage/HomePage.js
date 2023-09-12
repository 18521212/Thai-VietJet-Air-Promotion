import { Component } from 'react';
import './HomePage.scss';
import Header from './Header/Header';
import Banner from './Banner/Banner';
import Body from './Body/Body';
import Form from './Form/Form';
import Footer from './Footer/Footer';

class HomePage extends Component {
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

export default HomePage;
