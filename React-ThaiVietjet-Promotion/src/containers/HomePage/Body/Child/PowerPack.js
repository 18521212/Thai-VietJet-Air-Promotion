import { Component } from "react"
import './PowerPack.scss';

class PowerPack extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { packData } = this.props;
        console.log('pack data:', packData)
        return (
            <>
                <div className="power-pack">
                    <div className="container">
                        <div
                            className="row m-0"
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                overflow: 'hidden'
                            }}
                        >
                            <div className="title-power-pack col-12">
                                <h3>Power Pack</h3>
                            </div>
                            <div className="col-12">
                                <div className="content-power-pack">
                                    Thai Vietjet would like to introduce ‘POWER PACK – LOVE CONNECTION’ for traveling around Thailand,
                                    <br></br>
                                    <br></br>
                                    Purchase a set of flight tickets in advance for using over 5 years. Don’t have to worry that air ticket prices will be increased anymore!
                                    <br />
                                    After purchase, you will get a set of Promo Codes.
                                    <br></br>
                                    <br></br>
                                    Use the given code to create flight booking, confirming passenger name and your desired date and flights.
                                    <br />
                                    - Can be used for flying over the weekend (except specified black-out dates)
                                    <br />
                                    - Confirm booking at least 3 hours before departure time (subjected to seat availability)
                                    <br />
                                    - Apply for Thai Vietjet domestic routes in Thailand, excluded direct cross regional routes
                                    <br />
                                    - Only pay extra for tax, fees, and add-on services when booking
                                    <br />
                                    - Each code is for a round-trip ticket
                                    <br />
                                    - Applicable for one-way ticket, but the code cannot be re-claimed for the rest sector later
                                    <br />
                                    - The code is named codes and cannot be transferred to others.
                                    <br />
                                    - The Power Pack code can be redeemed for the limited tickets with the limited fare class only ( Only available for Ticket Class K, H, B, I, J, U, W, Z, A) which will be up to the seat availability in each flight while booking
                                    <br />
                                    <br />
                                    Only FUN Rewards Member can purchase POWER PACK – LOVE CONNECTION POWER PACK, you can register a FUN Rewards Member for free of charge before purchase
                                    <br />
                                    Selling Period: 25 May – 30 June 2023 (or until stock lasts)
                                    <br />
                                    Black-out Travel Period:
                                    <br />
                                    2023; 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                                    <br />
                                    2024; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May, 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                                    <br />
                                    2025; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May, 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                                    <br />
                                    2026; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May, 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                                    <br />
                                    2027; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May, 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                                    <br />
                                    2028; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May
                                    <br />
                                    <br />
                                    <br />
                                    The airline reserves the rights to change or add more black-out travel period following government public holiday. This is not impact those tickets which were successfully issued.
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                            <div className="content col-12">
                                <div className="list-pack">
                                    <div id="accordion">
                                        {packData && packData.length > 0 &&
                                            packData.map((item, index) => {
                                                return (
                                                    <>
                                                        <div className="pack" key={index}>
                                                            <div className="content-up">
                                                                <button
                                                                    data-toggle="collapse"
                                                                    data-target={'#p' + item.id}
                                                                    className="btn btn-primary"
                                                                    type="button"
                                                                >
                                                                    {item.name}
                                                                </button>
                                                            </div>
                                                            <div className="card">
                                                                <div
                                                                    className={`collapse ${index === 0 && "show"} 
                                                            content-down container-fluid`}
                                                                    id={'p' + item.id}
                                                                    data-parent="#accordion"
                                                                >
                                                                    <div className="wrapper row">
                                                                        <div className="content-left col-xl-8">
                                                                            Selling at {item.price} THB (Exclude VAT)<br />
                                                                            Get {item.code_number} Promo codes redeem for round trip tickets.<br />
                                                                            Average {item.price} THB/ round trip Exclude Tax and fees<br />
                                                                            {/* check avg_price */}
                                                                        </div>
                                                                        <div className="content-right col-xl-4">
                                                                            <a className="buy-now" href="#register-purchase">buy now</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PowerPack;