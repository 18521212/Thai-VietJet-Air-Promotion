import { Component } from "react";
import './TextInputForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import Select from 'react-select';
import { createTextInput, updateTextInput } from "services/formService";

class TextInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: { value: null, label: 'Text' },
            optionType: [
                { value: null, label: 'Text' },
                { value: 'email', label: 'Email' },
            ]
        }
    }

    componentDidMount() {
        func.MAP_STATE_ROUTE(this,
            {},
            {
                object: 'input',
                property: [
                    { key1: 'id', key2: ['text_input', 'id'] },
                    { key1: 'titleEn', key2: ['text_input', 'titleDataText_Input', 'valueEn'] },
                    { key1: 'titleTh', key2: ['text_input', 'titleDataText_Input', 'valueTh'] },
                    { key1: 'placeHolderEn', key2: ['text_input', 'placeHolderDataText_Input', 'valueEn'] },
                    { key1: 'placeHolderTh', key2: ['text_input', 'placeHolderDataText_Input', 'valueTh'] },
                ]
            }
        )
        this.mapSelect()
    }

    mapSelect = () => {
        let input = this.props.location.state?.input
        if (input) {
            let selected = this.state.optionType.filter(item => item.value === input.text_input.typeText)[0]
            this.setState({
                selectedType: selected
            })
        }
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        func.ONCHANGE_SELECT(this, selectedValue, actions)
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onSubmit = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            ['titleEn', 'titleTh', 'placeHolderEn', 'placeHolderTh',
                { key: 'typeText', property: ['selectedType', 'value'] }
            ],
            {
                func: createTextInput,
                callBack: () => { func.NAV(this, -1) }
            },
            {
                func: updateTextInput,
                property: ['id'],
                callBack: () => { func.NAV(this, -1) }
            }
        )
    }

    render() {
        return (
            <>
                <h3>Text Input Form</h3>
                <div className="row">
                    {this.state?.id &&
                        <>
                            <div class="form-group col-md-4">
                                <label for="id">{'Id (Text Input Id)'}</label>
                                <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                    value={this.state.id} disabled
                                    onChange={(event) => func.ONCHANGE_TEXT(this, 'titleEn', event)}
                                />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div class="form-group col-md-4">
                        <label for="id">Title English</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.titleEn}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'titleEn', event)}
                        />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="id">Title Thai</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.titleTh}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'titleTh', event)}
                        />
                    </div>
                    <div className="w-100"></div>
                    <div class="form-group col-md-4">
                        <label for="id">Place holder English</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.placeHolderEn}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'placeHolderEn', event)}
                        />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="id">Place holder Thai</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.placeHolderTh}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'placeHolderTh', event)}
                        />
                    </div>
                    <div className="w-100"></div>
                    <div className="form-group col-md-4">
                        <label for="id">Type</label>
                        <Select className="select-number"
                            value={this.state.selectedType}
                            options={this.state.optionType}
                            name='selectedType'
                            onChange={this.handleOnChangeSelect}
                            placeholder='Please choose an option'
                            isClearable={true}
                            styles={{
                                indicatorSeparator: () => { },
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
                </div>
                <div className="row px-3">
                    {component.BUTTON_SUBMIT(this, () => { this.onSubmit() }, 'mr-2')}
                    <button
                        className="btn btn-dark"
                        onClick={() => func.NAV(this, -1)}
                    >Cancel</button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // funcReact: () => dispatch(actions.funcRedux())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextInputForm));