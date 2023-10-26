import { Component } from "react";
import Select from 'react-select';
import './CustomerForm.scss';
import _ from 'lodash';
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { func } from 'utils'

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
                                let stateName = _.camelCase('selected' + item.input.dropdown.title)
                                let optionStateName = _.camelCase('option' + item.input.dropdown.title)
                                let name = {
                                    parentState: 'inputCustomerForm',
                                    name: _.camelCase('selected' + item.input.dropdown.title)
                                }
                                let title = language === 'en' ? item.input.dropdown.titleDataDropdown.valueEn :
                                    item.input.dropdown.titleDataDropdown.valueTh;
                                return (
                                    <div
                                        className={`form-group 
                                        ${'col-md-' + item.widthMdScreen}`}
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
                                return (
                                    <div
                                        className={`form-group 
                                        ${'col-md-' + item.widthMdScreen}`}
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