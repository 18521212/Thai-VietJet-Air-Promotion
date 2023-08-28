import { Component } from "react";
import Select from 'react-select';
import './CustomerForm.scss';
import _ from 'lodash';

class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOnChangeSelect = (selectLanguageObject, action) => {
        this.props.handleOnChangeSelect(selectLanguageObject, action);
    }

    handleOnChangeText = (event) => {
        this.props.handleOnChangeText(event);
    }

    render() {
        let { selectedTitle, middleGivenName, familyName,
            email, phone, passengerMiddleGivenName,
            passengerFamilyName, optionTitle,
            inputCustomerForm, dataInputCustomerForm } = this.props;
        return (
            <div className="customer-form">
                {/* <div className="row">
                    <div className="form-group col-xl-2">
                        <label>Title</label>
                        <Select
                            value={selectedTitle.value}
                            placeholder={selectedTitle.label}
                            options={optionTitle}
                            name='selectedTitle'
                            onChange={this.handleOnChangeSelect}
                            styles={{
                                indicatorSeparator: () => { },
                            }}
                        />
                    </div>

                    <div className="form-group col-xl-2">
                        <label>Middle and Given Name</label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event)}
                            value={middleGivenName}
                            placeholder={"Enter your middle and given name"}
                            required
                            name='middleGivenName'
                        />
                    </div>

                    <div className="form-group col-xl-3">
                        <label>Family Name</label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event)}
                            value={familyName}
                            placeholder={"Enter your name"}
                            required
                            name='familyName'
                        />
                    </div>

                    <div className="form-group col-xl-3">
                        <label>Email</label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event)}
                            value={email}
                            placeholder={"Enter your email"}
                            required
                            name='email'
                        />
                    </div>

                    <div className="form-group col-xl-2">
                        <label>Phone</label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event)}
                            value={phone}
                            placeholder={"eg. +665555551212"}
                            required
                            name='phone'
                        />
                    </div>

                    <div className="form-group col-xl-4">
                        <label>Passenger Middle and Given Name</label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event)}
                            value={passengerMiddleGivenName}
                            placeholder={"Enter Passenger middle and given name"}
                            required
                            name='passengerMiddleGivenName'
                        />
                    </div>

                    <div className="form-group col-xl-4">
                        <label>Passenger Family Name</label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event)}
                            value={passengerFamilyName}
                            placeholder={"Enter Passenger Name"}
                            required
                            name='passengerFamilyName'
                        />
                    </div>
                </div> */}
                {/* -------------------- */}
                <div className="row">
                    {dataInputCustomerForm && dataInputCustomerForm.length > 0 &&
                        dataInputCustomerForm.map((item, index) => {
                            if (item.Input.typeInput === 'dropdown') {
                                return (
                                    <div
                                        className={`form-group 
                                        ${'col-xl-' + item.widthXLScreen}`}
                                    >
                                        <label>{item.Input.Dropdown.title}</label>
                                        <Select
                                            value={inputCustomerForm[_.camelCase('selected' + item.Input.Dropdown.title)]}
                                            placeholder={selectedTitle.label}
                                            options={inputCustomerForm[_.camelCase('option' + item.Input.Dropdown.title)]}
                                            name={_.camelCase('selected' + item.Input.Dropdown.title)}
                                            onChange={this.handleOnChangeSelect}
                                            styles={{
                                                indicatorSeparator: () => { },
                                            }}
                                        />
                                    </div>
                                )
                            } else if (item.Input.typeInput === 'text') {
                                let title = item.Input.Text_Input.title
                                let placeHolder = item.Input.Text_Input.placeHolder
                                let stateName = _.camelCase(item.Input.Text_Input.title);
                                return (
                                    <div
                                        className={`form-group 
                                        ${'col-xl-' + item.widthXLScreen}`}
                                    >
                                        <label>{title}</label>
                                        <input
                                            className="form-control"
                                            onChange={(event) => this.handleOnChangeText(event)}
                                            value={inputCustomerForm[stateName]}
                                            placeholder={placeHolder}
                                            required
                                            name={stateName}
                                        />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default CustomerForm;