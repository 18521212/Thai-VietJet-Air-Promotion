import { Component } from "react"
import './PowerPack.scss';

class PowerPack extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handlePackShow = (item) => {
        if (item.id === this.state.showPack) {
            this.setState({
                showPack: 0
            })
            return;
        }
        this.setState({
            showPack: item.id
        })
    }

    render() {
        let { listPack } = this.props;
        return (
            <div className="power-pack">
                <div className="title-power-pack">
                    <div className="title">
                        <h3>Power Pack</h3>
                    </div>
                </div>
                <div className="content">
                    <div className="content-power-pack">
                        Thai Vietjet would like to introduce ‘POWER PACK – LOVE CONNECTION’ for traveling around Thailand,

                        Purchase a set of flight tickets in advance for using over 5 years. Don’t have to worry that air ticket prices will be increased anymore!
                        After purchase, you will get a set of Promo Codes.

                        Use the given code to create flight booking, confirming passenger name and your desired date and flights.
                        - Can be used for flying over the weekend (except specified black-out dates)
                        - Confirm booking at least 3 hours before departure time (subjected to seat availability)
                        -- Apply for Thai Vietjet domestic routes in Thailand, excluded direct cross regional routes
                        - Only pay extra for tax, fees, and add-on services when booking
                        - Each code is for a round-trip ticket
                        - Applicable for one-way ticket, but the code cannot be re-claimed for the rest sector later
                        - The code is named codes and cannot be transferred to others.
                        - The Power Pack code can be redeemed for the limited tickets with the limited fare class only ( Only available for Ticket Class K, H, B, I, J, U, W, Z, A) which will be up to the seat availability in each flight while booking

                        Only FUN Rewards Member can purchase POWER PACK – LOVE CONNECTION POWER PACK, you can register a FUN Rewards Member for free of charge before purchase
                        Selling Period: 25 May – 30 June 2023 (or until stock lasts)
                        Black-out Travel Period:
                        2023; 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                        2024; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May, 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                        2025; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May, 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                        2026; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May, 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                        2027; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May, 1-6 Jun, 27-31 Jul, 1 Aug, 10-15 Aug, 12-16 Oct, 19-24 Oct, 30 Nov - 5 Dec, 7-11 Dec, 21-26 Dec, 27-31 Dec
                        2028; 1- 9 Jan, 19-24 Jan, 3-7 Mar, 6-10 Apr, 12-24 Apr, 27 Apr - 2 May

                        The airline reserves the rights to change or add more black-out travel period following government public holiday. This is not impact those tickets which were successfully issued.
                    </div>
                    <div className="list-pack">
                        <div id="accordion">
                            {listPack && listPack.length > 0 &&
                                listPack.map((item, index) => {
                                    return (
                                        <div className="pack" key={index}>
                                            <div className="content-up">
                                                <button
                                                    data-toggle="collapse"
                                                    data-target={'#p' + item.id}
                                                    className="btn btn-primary"
                                                    type="button"
                                                // onClick={() => this.handlePackShow(item)}
                                                >
                                                    {item.pack_name}
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
                                                            Average {item.avg_price} THB/ round trip Exclude Tax and fees<br />

                                                        </div>
                                                        <div className="content-right col-xl-4">
                                                            <a className="buy-now" href="#register-purchase">buy now</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PowerPack;