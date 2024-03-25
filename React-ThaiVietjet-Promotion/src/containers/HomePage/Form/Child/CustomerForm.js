import { Component } from "react";
import Select from 'react-select';
import './CustomerForm.scss';
import _ from 'lodash';
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { func } from 'utils'

let typeText = (type) => {
    let resultType
    if (type === 'phone') {
        resultType = 'tel'
    } else if (type === 'email') {
        resultType = 'email'
    } else if (!type) {
        resultType = 'text'
    }
    return resultType
}

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
        let { inputCustomerForm, dataInputCustomerForm, language } = this.props;
        return (
            <div className="customer-form">
                <div className="row">
                    {dataInputCustomerForm && dataInputCustomerForm.length > 0 &&
                        dataInputCustomerForm.map((item, index) => {
                            if (item.input.typeInput === 'dropdown') {
                                let nameConfig = func.STATENAME_DROPDOWN(item)
                                let stateName = nameConfig[0]
                                let optionStateName=nameConfig[1]
                                let name = {
                                    parentState: 'inputCustomerForm',
                                    name: stateName
                                }
                                let title = language === 'en' ? item.input.dropdown.titleDataDropdown.valueEn :
                                    item.input.dropdown.titleDataDropdown.valueTh;
                                return (
                                    <div
                                        className={`form-group 
                                        ${'col-md-' + item.widthMdScreen}`}
                                        key={index}
                                    >
                                        <label>{title}</label>
                                        <Select
                                            className="select-number"
                                            value={inputCustomerForm[stateName]}
                                            options={inputCustomerForm[optionStateName]}
                                            name={name}
                                            onChange={this.handleOnChangeSelect}
                                            styles={{
                                                indicatorSeparator: () => { },
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: "#eff2f5",
                                                }),
                                            }}
                                            menuPosition="fixed"
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary: 'grey'
                                                }
                                            })}
                                        />
                                    </div>
                                )
                            } else if (item.input.typeInput === 'text') {
                                let title, placeHolder;
                                if (language === 'en') {
                                    title = item.input.text_input.titleDataText_Input.valueEn
                                    placeHolder = item.input.text_input.placeHolderDataText_Input.valueEn
                                } else {
                                    title = item.input.text_input.titleDataText_Input.valueTh
                                    placeHolder = item.input.text_input.placeHolderDataText_Input.valueTh
                                }
                                let stateName = func.STATENAME_INPUT(item);
                                let typeTextInput = typeText(item.input.text_input.typeText)
                                return (
                                    <div
                                        className={`form-group ${'col-md-' + item.widthMdScreen}`}
                                        key={index}
                                    >
                                        <label>{title}</label>
                                        <input
                                            className="form-control"
                                            type={typeTextInput}
                                            // pattern={typeTextInput === 'tel' && "[0-9]" || undefined}
                                            onChange={(event) => this.handleOnChangeText(event)}
                                            value={inputCustomerForm[stateName]}
                                            placeholder={placeHolder}
                                            required={item.required ? 'required' : ''}
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

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);