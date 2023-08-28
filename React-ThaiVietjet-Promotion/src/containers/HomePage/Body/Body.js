import { Component } from "react";
import './Body.scss';
// import banner_desktop from '../../../assets/Banner/banner.jpg';
// import banner_mobile from '../../../assets/Banner/banner-mobile.jpg';
import top_cloud from '../../../assets/Background/top_cloud.png';
import Select from 'react-select';

import PowerPack from './Child/PowerPack';
import CustomerForm from './Child/CustomerForm';
import FrameCard from "./Child/FrameCard";
import PurchaseBreakdown from "./Child/PurchaseBreakdown";
import Footer from "../Footer/Footer";

import { getAllBanners, getAllTextInput, getFormSectionById } from "../../../services/userService";

import _ from 'lodash';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner_mobile: '',
            banner_desktop: '',

            selectedTitle: '',
            selectedNoPack4: '',
            selectedNoPack6: '',
            selectedNoPack12: '',
            selectedNoPack24: '',

            dataInputCustomerForm: '',
            inputCustomerForm: {},

            vat: 0,
            total: 0,

            //hardcode data api
            listPack: [
                { id: '4', pack_name: 'pack 4', price: 6400, code_number: 6, avg_price: 1660 },
                { id: '6', pack_name: 'pack 6', price: 9000, code_number: 3, avg_price: 1500 },
                { id: '12', pack_name: 'pack 12', price: 16800, code_number: 2, avg_price: 1400 },
                { id: '24', pack_name: 'pack 24', price: 30000, code_number: 1, avg_price: 1250 },
            ],
            optionTitle: [
                { value: 1, label: 'Mr' },
                { value: 2, label: 'Mrs' },
                { value: 0, label: 'Ms' },
            ],
        }
    }

    componentDidMount() {
        this.buildDataSelect();
        this.getData();
        this.initCustomerFormInputState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedNoPack4 !== this.state.selectedNoPack4 ||
            prevState.selectedNoPack6 !== this.state.selectedNoPack6 ||
            prevState.selectedNoPack12 !== this.state.selectedNoPack12 ||
            prevState.selectedNoPack24 !== this.state.selectedNoPack24) {
            let idArrayPack = ['4', '6', '12', '24'];
            let totalPrice = 0;
            for (let i = 0; i < idArrayPack.length; i++) {
                let numberPack = this.state['selectedNoPack' + idArrayPack[i]].value;
                let pricePack = this.state.listPack[i].price;
                totalPrice = totalPrice + numberPack * pricePack;
            }

            this.setState({
                total: totalPrice,
                vat: totalPrice / 10
            })
        }
    }

    getData = async () => {
        //get data banner image desktop, mobile
        let image_mobile, image_desktop = '';
        let dataBanner = await getAllBanners();
        dataBanner && dataBanner.data && dataBanner.data.length > 0 &&
            dataBanner.data.map((item, index) => {
                if (item.type === 'mobile') {
                    image_mobile = item.image;
                }
                if (item.type === 'desktop') {
                    image_desktop = item.image;
                }
            })
        this.setState({
            banner_mobile: image_mobile,
            banner_desktop: image_desktop
        })


    }

    initCustomerFormInputState = async () => {
        // get data
        let formSection = await getFormSectionById(1);
        console.log('formSection:', formSection.data.Form.Form_Detail)
        let listInput = formSection.data.Form.Form_Detail;
        listInput.sort((a, b) => a.order - b.order);

        let { inputCustomerForm } = this.state;
        let stateCopy = {
            ...inputCustomerForm,
        }

        // map state
        listInput.map((item, index) => {
            if (item.Input.typeInput === 'text') {
                stateCopy[_.camelCase(item.Input.Text_Input.title)] = '';
            }
            if (item.Input.typeInput === 'dropdown') {
                let title = item.Input.Dropdown.title;
                stateCopy[_.camelCase('selected' + title)] = '';// object
                stateCopy[_.camelCase('option' + title)] = [];

                // map dropdown data
                item.Input.Dropdown.dataDropdown.map((item, index) => {
                    let option = { value: item.value, label: item.label }
                    stateCopy[_.camelCase('option' + title)].push(option)
                })
                // set default selected option
                stateCopy[_.camelCase('selected' + title)] = stateCopy[_.camelCase('option' + title)][0];
            }
        })

        this.setState({
            inputCustomerForm: stateCopy,
            dataInputCustomerForm: listInput
        })
    }

    buildDataSelect = async () => {

        //build data select Pack, Title
        let defaulValue = { value: 0, label: 0 };
        this.setState({
            selectedTitle: this.state.optionTitle[0],

            selectedNoPack4: defaulValue,
            selectedNoPack6: defaulValue,
            selectedNoPack12: defaulValue,
            selectedNoPack24: defaulValue,
        })
    }

    handleOnChangeSelect = (selectLanguageObject, action) => {
        let stateCopy = { ...this.state };
        stateCopy.inputCustomerForm[action.name] = selectLanguageObject;
        this.setState({
            ...stateCopy
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
        // console.log('state:', this.state)
        let {
            banner_desktop, banner_mobile,
            showPack, listPack, inputCustomerForm,
            selectedTitle, selectedNoPack4, selectedNoPack6,
            selectedNoPack12, selectedNoPack24, vat, total,
            optionTitle, dataInputCustomerForm
        } = this.state;
        let {
            middleGivenName, familyName,
            email, phone, passengerMiddleGivenName,
            passengerFamilyName,
        } = this.state.inputCustomerForm;

        return (
            <div className='body'>
                <div className="image-container">
                    <picture>
                        <source srcSet={banner_mobile} media="(max-width: 600px)" />
                        <img className="advertise-image content-left"
                            src={banner_desktop}
                            alt="advertise-banner"
                        />
                    </picture>
                </div>

                <div className="main-content-container">
                    <div className="main-background">
                        <PowerPack
                            listPack={listPack}
                            showPack={showPack}
                        />

                        <span className="img-container">
                            <img className="container-fluid p-0" src={top_cloud} alt="top-cloud" />
                        </span>
                    </div>

                    <div className="register-purchase" id="register-purchase">
                        <div className="title">
                            <h4 className="title-contact">register and purchase</h4>
                        </div>

                        <div className="form-container">
                            <div className="inner-form">
                                <strong className="instruct-form">Before you fill up the
                                    information of the person who you will want to send this gift to,
                                    please fill your information in to below boxes:
                                </strong>
                                <form action="#">
                                    <CustomerForm
                                        selectedTitle={selectedTitle}
                                        middleGivenName={middleGivenName}
                                        familyName={familyName}
                                        email={email}
                                        phone={phone}
                                        passengerMiddleGivenName={passengerMiddleGivenName}
                                        passengerFamilyName={passengerFamilyName}
                                        optionTitle={optionTitle}

                                        dataInputCustomerForm={dataInputCustomerForm}
                                        inputCustomerForm={inputCustomerForm}

                                        handleOnChangeSelect={this.handleOnChangeSelect}
                                        // handleOnChangeText={this.handleOnChangeText}
                                        handleOnChangeText={this.handleOnChangeInputCustomerForm}
                                    />

                                    <FrameCard
                                        listPack={listPack}
                                        selectedNoPack4={selectedNoPack4}
                                        selectedNoPack6={selectedNoPack6}
                                        selectedNoPack12={selectedNoPack12}
                                        selectedNoPack24={selectedNoPack24}

                                        handleOnChangeSelect={this.handleOnChangeSelect}
                                    />

                                    <div className="container-fluid p-0">

                                        <PurchaseBreakdown
                                            listPack={listPack}
                                            selectedNoPack4={selectedNoPack4}
                                            selectedNoPack6={selectedNoPack6}
                                            selectedNoPack12={selectedNoPack12}
                                            selectedNoPack24={selectedNoPack24}
                                            vat={vat}
                                            total={total}
                                        />
                                        <div className="form-check col-xl-6">
                                            <input type="checkbox" className="checkbox-confirm" required></input>
                                            <label htmlFor="form-check-label checkbox-confirm-label">
                                                <a href="#">I accept the terms & conditions*</a>
                                            </label><br />
                                        </div>
                                        <div className="col-6 text-right pr-0">
                                            <input className="btn-submit" type="submit" value="Submit"
                                                onClick={(event) => this.handleButtonSubmitOnClick(event)}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <Footer />
                    </div>
                </div>
            </div >
        )
    }
}

export default Body;