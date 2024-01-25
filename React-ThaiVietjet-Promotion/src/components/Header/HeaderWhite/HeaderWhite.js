import { Component } from "react";
import './HeaderWhite.scss'

class HeaderWhite extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className='container-fluid bg-white headerwhite01'>
                    <div className='content'>
                        <div className='cart-headerlogo'>
                            <img src="https://s3.ap-southeast-1.amazonaws.com/th.vietjetair.com/uploads/U6ZYvvzVeVyYT6E6dcwn7tUxBmwFrnOj3G3KLWHb.svg"></img>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default HeaderWhite;