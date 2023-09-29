import { Component } from "react";
import './Form.scss'
import _ from 'lodash';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import CustomerForm from './Child/CustomerForm';
import FrameCard from "./Child/FrameCard";
import PurchaseBreakdown from "./Child/PurchaseBreakdown";

import Footer from "../Footer/Footer";

import {
    
} from "services/userService";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataInputCustomerForm: '',
            inputCustomerForm: {},

            vat: 0,
            total: 0,

            packData: '',
            inputFrameCard: {},
            // totalObj: {
            //     total2: 0
            // }
        }
    }

    componentDidMount() {
        // this.getDataAndMapState();
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.inputFrameCard) !== JSON.stringify(this.state.inputFrameCard)) {//
            let totalPrice = 0;
            let { packData } = this.state;
            packData.map((item, index) => {
                let numberPack = this.state.inputFrameCard[_.camelCase('selected' + item.name)].value;
                let pricePack = item.price;
                totalPrice = totalPrice + numberPack * pricePack;
            })
            this.setState({
                total: totalPrice,
                vat: totalPrice / 10
            })
        }
    }

    // getDataAndMapState = async () => {
    //     // get data
    //     let formSection = await getFormSectionById(1);
    //     // console.log('formSection:', formSection.data.Form.Form_Detail)
    //     let listInput = formSection.data.Form.Form_Detail;
    //     listInput.sort((a, b) => a.order - b.order);

    //     let { inputCustomerForm } = this.state;
    //     let stateCopy = {
    //         ...inputCustomerForm,
    //     }

    //     // map state
    //     listInput.map((item, index) => {
    //         if (item.Input.typeInput === 'text') {
    //             stateCopy[_.camelCase(item.Input.Text_Input.title)] = '';
    //         } else if (item.Input.typeInput === 'dropdown') {
    //             let title = item.Input.Dropdown.title;
    //             stateCopy[_.camelCase('selected' + title)] = '';// object
    //             stateCopy[_.camelCase('option' + title)] = [];

    //             // map dropdown data
    //             item.Input.Dropdown.dataDropdown.map((item, index) => {
    //                 let option = { value: item.value, label: item.label }
    //                 stateCopy[_.camelCase('option' + title)].push(option)
    //             })
    //             // set default selected option
    //             stateCopy[_.camelCase('selected' + title)] = stateCopy[_.camelCase('option' + title)][0];
    //         }
    //     })

    //     // pack data
    //     let packData = await getAllPack();

    //     // map state pack data
    //     // let stateCopy2 = {
    //     //     ...this.state.inputFrameCard,
    //     // }

    //     let { inputFrameCard } = this.state
    //     let stateCopy2 = {
    //         ...inputFrameCard
    //     }

    //     packData.data.map((item, index) => {
    //         stateCopy2[_.camelCase('option' + item.name)] = '';
    //         let option = []
    //         for (let i = 0; i <= item.maxNumber; i++) {
    //             option.push({ value: i, label: i })
    //         }
    //         stateCopy2[_.camelCase('option' + item.name)] = option;
    //         stateCopy2[_.camelCase('selected' + item.name)] = stateCopy2[_.camelCase('option' + item.name)][0];
    //     })

    //     this.setState({
    //         ...this.state,
    //         inputCustomerForm: stateCopy,
    //         dataInputCustomerForm: listInput,
    //         packData: packData.data,
    //         inputFrameCard: stateCopy2,
    //     })
    // }

    handleOnChangeSelect = (selectedOption, action) => {
        this.setState({
            [action.name.parentState]: { ...this.state[action.name.parentState], [action.name.name]: selectedOption },
            // totalObj: { ...this.state.totalObj, total2: this.state.totalObj.total2 + 1 }
            // ['totalObj']: { ...this.state['totalObj'], ['total2']: this.state['totalObj']['total2'] + 1 }
        })
    }

    handleOnChangeText = (event) => {
        let stateCopy = { ...this.state };
        stateCopy.inputCustomerForm[event.target.name] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeInputCustomerForm = (event) => {
        //cach 1
        let { inputCustomerForm } = this.state;
        let stateCopy = {
            ...inputCustomerForm,
            [event.target.name]: event.target.value
        }
        this.setState({
            inputCustomerForm: stateCopy
        })
        //------------------
        //cach 2
        // let stateCopy1 = { ...this.state };
        // stateCopy1.inputCustomerForm[event.target.name] = event.target.value;
        // this.setState({
        //     ...stateCopy1
        // })
    }

    handleButtonSubmitOnClick = (event) => {
        if (this.state.total === 0) {
            alert('Please choose at least 1 promote package')
            event.preventDefault();
        }
        // event.preventDefault();
    }

    render() {
        let { packData, inputFrameCard,
            inputCustomerForm, vat, total,
            dataInputCustomerForm
        } = this.state;
        let { language } = this.props
        return (
            <>
                <div className="form-container">
                    <form action="#">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="title-contact">register and purchase</h4>
                            </div>

                            <div className="col-sm-12">
                                <div className="inner-form">
                                    <strong>Before you fill up the
                                        information of the person who you will want to send this gift to,
                                        please fill your information in to below boxes:
                                    </strong>

                                    <div className="main-form" style={{ marginTop: '15px' }}>
                                        <CustomerForm
                                            dataInputCustomerForm={dataInputCustomerForm}
                                            inputCustomerForm={inputCustomerForm}

                                            handleOnChangeSelect={this.handleOnChangeSelect}
                                            // handleOnChangeText={this.handleOnChangeText}
                                            handleOnChangeText={this.handleOnChangeInputCustomerForm}
                                        />

                                        <div className="bottom-form">
                                            <FrameCard
                                                packData={packData}
                                                inputFrameCard={inputFrameCard}

                                                handleOnChangeSelect={this.handleOnChangeSelect}
                                            />

                                            <div className="row">
                                                <div className="col-md-6 col-xs-12">
                                                    <PurchaseBreakdown
                                                        packData={packData}
                                                        inputFrameCard={inputFrameCard}
                                                        vat={vat}
                                                        total={total}
                                                    />
                                                    <div className="col-12">
                                                        <input type="checkbox" className="checkbox-confirm" required></input>
                                                        <label htmlFor="form-check-label checkbox-confirm-label">
                                                            <a href="#">I accept the terms & conditions*</a>
                                                        </label><br />
                                                    </div>

                                                    <button className="button next" type="submit"
                                                        onClick={(event) => this.handleButtonSubmitOnClick(event)}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);