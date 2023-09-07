import { Component } from "react";
import Select from 'react-select';
import './CustomerForm.scss';
import _ from 'lodash';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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
                            if (item.Input.typeInput === 'dropdown') {
                                let stateName = _.camelCase('selected' + item.Input.Dropdown.title)
                                let optionStateName = _.camelCase('option' + item.Input.Dropdown.title)
                                let name = {
                                    parentState: 'inputCustomerForm',
                                    name: _.camelCase('selected' + item.Input.Dropdown.title)
                                }
                                let title = language === 'en' ? item.Input.Dropdown.titleDataDropdown.valueEn :
                                    item.Input.Dropdown.titleDataDropdown.valueTh;
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
                            } else if (item.Input.typeInput === 'text') {
                                let title, placeHolder;
                                if (language === 'en') {
                                    title = item.Input.Text_Input.titleDataText_Input.valueEn
                                    placeHolder = item.Input.Text_Input.placeHolderDataText_Input.valueEn
                                } else {
                                    title = item.Input.Text_Input.titleDataText_Input.valueTh
                                    placeHolder = item.Input.Text_Input.placeHolderDataText_Input.valueTh
                                }
                                let stateName = _.camelCase(item.Input.Text_Input.title);
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