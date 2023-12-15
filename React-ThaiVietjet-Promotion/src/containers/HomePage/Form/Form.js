import { Component } from "react";
import './Form.scss'
import _ from 'lodash';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CustomerForm from './Child/CustomerForm';
import FrameCard from "./Child/FrameCard";
import PurchaseBreakdown from "./Child/PurchaseBreakdown";
import Footer from "../Footer/Footer";
import * as actions from 'store/actions';
import { func, association } from 'utils'
import { sentPayment } from "services/paymentService";
import withRouter from "components/withRouter/withRouter"

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
            check_term: false,
        }
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.inputFrameCard) !== JSON.stringify(this.state.inputFrameCard)) {//
            let totalPrice = 0, totalVat = 0;
            let { packData } = this.state;
            packData.map((item, index) => {
                let numberPack = this.state.inputFrameCard[_.camelCase(item.name) + `-${item.id}`].value;
                let vat = item.vat
                let priceExcludeVat = numberPack * item.price
                let priceVat = priceExcludeVat * vat
                let priceIncludeVat = priceExcludeVat + priceVat
                totalPrice += priceIncludeVat;
                totalVat += priceVat
                //

            })
            this.setState({
                total: totalPrice,
                vat: totalVat
            })
        }
    }

    loadData = async () => {
        await this.props.loadFormDetail(this.props?.formId)
        this.mapState()
        await this.props.loadFooter(this.props?.footerId)
    }

    mapState = async () => {
        let listInput = this.props.form_details.data;

        let stateCopy = {
            ...this.state.inputCustomerForm,
        }

        // map state
        listInput.map((item, index) => {
            if (item.input?.typeInput === 'text') {
                stateCopy[func.STATENAME_INPUT(item)] = ''
            } else if (item.input.typeInput === 'dropdown') {
                // let title = item.input.dropdown.title;
                let name = func.STATENAME_DROPDOWN(item)
                let selectedName = name[0], optionName = name[1]
                stateCopy[selectedName] = '';
                stateCopy[optionName] = [];
                item.input.dropdown.dataDropdown.map((item, index) => {
                    let option = { value: item.value, label: item.label }
                    stateCopy[optionName].push(option)
                })
                stateCopy[selectedName] = stateCopy[optionName][0];
            }
        })
        // pack option
        let packData = this.props.promotion
        let stateCopyFrameCard = {
            ...this.state.inputFrameCard
        }
        packData?.data.pack.map((item, index) => {
            stateCopyFrameCard[_.camelCase('option' + item.name)] = '';
            let option = []
            for (let i = 0; i <= item.maxNumber; i++) {
                option.push({ value: i, label: i })
            }
            stateCopyFrameCard[_.camelCase('option' + item.name)] = option;
            // stateCopy2[_.camelCase('selected' + item.name)] = stateCopy2[_.camelCase('option' + item.name)][0];
            stateCopyFrameCard[_.camelCase(item.name) + `-${item.id}`] = stateCopyFrameCard[_.camelCase('option' + item.name)][0];
        })
        this.setState({
            ...this.state,
            inputCustomerForm: stateCopy,
            dataInputCustomerForm: listInput,
            packData: packData?.data.pack,
            inputFrameCard: stateCopyFrameCard,
        })
    }

    handleOnChangeSelect = (selectedOption, action) => {
        this.setState({
            [action.name.parentState]: { ...this.state[action.name.parentState], [action.name.name]: selectedOption },
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

    configPropertySentData = (data) => {
        // console.log('bdac',data)
        let properyArr = Object.getOwnPropertyNames(data)
        for (let i = 0; i < properyArr.length; i++) {
            if (properyArr[i].startsWith('option')) {
                delete data[properyArr[i]]
            }
            if (typeof (data[properyArr[i]]) === 'object') { // conert select {value: '', label: ''} -> select: ''
                data[properyArr[i]] = data[properyArr[i]].value
            }
        }
        // console.log('adac',data)
    }

    handleButtonSubmitOnClick = async (event) => {
        let dataCustomer = func.DEEP_COPY_OBJECT(this.state.inputCustomerForm),
            dataPack = func.DEEP_COPY_OBJECT(this.state.inputFrameCard)
        this.configPropertySentData(dataCustomer)
        this.configPropertySentData(dataPack)
        console.log('after', dataCustomer, dataPack)
        let data = {
            payment: {
                customer: dataCustomer,
                pack: dataPack,
                price: {
                    total: this.state.total,
                    vat: this.state.vat
                }
            }
        }
        if (this.state.total === 0) {
            alert('Please choose at least 1 promote package')
            event.preventDefault();
            return
        }
        if (this.state.check_term === false) {
            return
        }
        event.preventDefault()
        let resPayment = await func.HANDLE_CREATE_UPDATE(data, sentPayment)
        console.log('respayment', resPayment)
        resPayment.valid && this.props.navigate('/payment', { state: { resPayment: resPayment } })
        // console.log('input', data, 'config', this.state.dataInputCustomerForm, 'pack', this.state.inputFrameCard)
        // sent data: data
    }

    render() {
        let { packData, inputFrameCard,
            inputCustomerForm, vat, total,
            dataInputCustomerForm
        } = this.state;
        let { language } = this.props
        let footer = this.props?.footer?.data
        // console.log('input c', inputCustomerForm)
        // console.log('data c', dataInputCustomerForm)
        return (
            <>
                <div className="form-container">
                    <form autoComplete="off"
                    >
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 className="title-contact"> <FormattedMessage id="form.title" /> </h4>
                            </div>

                            <div className="col-sm-12">
                                <div className="inner-form">
                                    <strong>
                                        <FormattedMessage id="form.instruct" />
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
                                                        <input type="checkbox" className="checkbox-confirm" required
                                                            checked={this.state.check_term}
                                                            onChange={(event) => func.ONCHANGE_CHECKBOX(this, event, 'check_term')}
                                                        ></input>
                                                        <label htmlFor="form-check-label checkbox-confirm-label">
                                                            <a href="#" data-toggle="modal" data-target="#exampleModal">I accept the terms & conditions*</a>
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
                    {footer && footer?.[association.MARKDOWN_TERM_AND_CONDITION] &&
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">
                                            {footer?.[association.MARKDOWN_TERM_AND_CONDITION].titleEn}
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body"
                                        dangerouslySetInnerHTML={
                                            {
                                                __html: language === 'en' ?
                                                    footer?.[association.MARKDOWN_TERM_AND_CONDITION].contentEn
                                                    :
                                                    footer?.[association.MARKDOWN_TERM_AND_CONDITION].contentTh
                                            }
                                        }
                                    >

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        form_details: state.admin.form_details,
        promotion: state.admin.promotion,
        footer: state.admin.footer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadFormDetail: (id) => dispatch(actions.fetchFormDetailByFormId(id)),
        loadFooter: (id) => dispatch(actions.fetchFooter(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));