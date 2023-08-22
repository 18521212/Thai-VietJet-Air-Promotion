import { Component } from "react";
import './Footer.scss';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <hr />
                <div className='footer'>
                    <div className="link-panel">
                        <a target="_blank" href="https://gift.th.vietjetair.com#">Terms and Conditions</a>
                        |
                        <a target="_blank" href="https://gift.th.vietjetair.com#"> FAQ</a>
                        |
                        <a target="_blank" href="https://gift.th.vietjetair.com#">How to use</a>
                    </div>
                </div>
            </>
        )
    }
}

export default Footer;