import { Component } from "react";
import './PurchaseBreakdown.scss';
import NumberFormat from 'react-number-format';

class PurchaseBreakdown extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { listPack, selectedNoPack4, selectedNoPack6,
            selectedNoPack12, selectedNoPack24, vat,
            total } = this.props;
        return (
            <div className="container-fluid p-0">
                <div className="purchase-breakdown col-xl-6 col-12">
                    <div>
                        <h4>Purchase Breakdown</h4>
                        {listPack && listPack.length > 0 &&
                            listPack.map((item, index) => {
                                let id = item.id;
                                let selectedNoPack = this.props['selectedNoPack' + item.id].value;
                                return (
                                    <div className="row mb-2" key={index}>
                                        <span className="col">PACK {id} X {selectedNoPack}</span>
                                        <span className="col text-right">
                                            <NumberFormat
                                                className='currency'
                                                value={item.price * selectedNoPack}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix={' THB'}
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