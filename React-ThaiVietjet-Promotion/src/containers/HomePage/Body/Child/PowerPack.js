import { Component } from "react"
import './PowerPack.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class PowerPack extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { packData, contentBodyData, language } = this.props;
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
                                <div className="content-power-pack" dangerouslySetInnerHTML={{ __html: language === 'en' ? contentBodyData?.contentEn : contentBodyData?.contentTh }}>

                                </div>
                            </div>
                            <div className="col-12">
                                <div className="list-pack">
                                    <div id="accordion">
                                        {packData && packData.length > 0 &&
                                            packData.map((item, index) => {
                                                return (
                                                    <>
                                                        <div className="card" key={index}>
                                                            <div className="card-header">
                                                                <button
                                                                    data-toggle="collapse"
                                                                    data-target={'#p' + item.id}
                                                                    className="btn btn-primary"
                                                                    type="button"
                                                                >
                                                                    {item.name}
                                                                </button>
                                                            </div>

                                                            <div
                                                                className={`collapse ${index === 0 && "show"} `}
                                                                id={'p' + item.id}
                                                                data-parent="#accordion"
                                                            >
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-8">
                                                                            <FormattedMessage id="body.selling-at" /> {item.price} <FormattedMessage id="body.exclude-vat" /><br />
                                                                            <FormattedMessage id="body.get" /> {item.numberRedeem} <FormattedMessage id="body.redeem" /><br />
                                                                            <FormattedMessage id="body.average" /> {item.price}  <FormattedMessage id="body.round-trip" /><br />
                                                                            {/* check avg_price */}
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <a className="buy-now" href="#register-purchase">BUY NOW</a>
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
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PowerPack);