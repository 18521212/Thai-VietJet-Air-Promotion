import { Component } from "react";
import './PurchaseBreakdown.scss';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

class PurchaseBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { packData, inputFrameCard, vat, total } = this.props;
        return (
            <div className="container-fluid p-0">
                <div className="purchase-breakdown col-xl-6 col-12">
                    <div>
                        <h4>Purchase Breakdown</h4>
                        {packData && packData.length > 0 &&
                            packData.map((item, index) => {
                                let stateName = _.camelCase('selected' + item.name)
                                return (
                                    <div className="row mb-2" key={index}>
                                        <span className="col">{item.name} X {inputFrameCard[stateName].value}</span>
                                        <span className="col text-right">
                                            <NumberFormat
                                                className='currency'
                                                value={item.price * inputFrameCard[stateName].value}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix={` ${item.currency}`}
                                                decimalSeparator={'.'}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                            />
                                        </span>
                                    </div>
                                )
                            })
                        }
                        <div className="row mb-2">
                            <span className="col">VAT</span>
                            <span className="col text-right">
                                <NumberFormat
                                    className='currency'
                                    value={vat ? vat : 0}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix={' THB'}
                                    decimalSeparator={'.'}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                />
                            </span>
                        </div>
                        <div className="row mb-2">
                            <span className="col">Total</span>
                            <span className="col text-right">
                                <NumberFormat
                                    className='currency'
                                    value={total ? total : 0}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix={' THB'}
                                    decimalSeparator={'.'}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PurchaseBreakdown;