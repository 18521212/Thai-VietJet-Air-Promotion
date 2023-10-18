import { Component } from "react";
// import './RenderInput.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Select from 'react-select';
import { func } from 'utils'

// usage

class RenderInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '',
            textInput: '',
        }
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    buildDataOption = (data) => {
        let option = []
        data && data.map((item) => {
            option.push({ value: item.value, label: item.label })
        })
        return option
    }

    buildInput = () => {
        let data = this.props.data
        if (!data) return
        let element
        switch (data?.typeInput) {
            case 'text':
                element =
                    <>
                        <div
                            className={`form-group 
                                        ${'col-md-' + data.widthMdScreen}`}
                        >
                            <label>{data.text_input.titleDataText_Input.valueEn}</label>
                            <input
                                className="form-control"
                                onChange={(e) => func.ONCHANGE_TEXT(this, 'textInput', e)}
                                value={this.state.textInput}
                                placeholder={data.text_input?.placeHolderDataText_Input.valueEn}
                                required
                                name={'textInput'}
                            />
                        </div>
                    </>
                break;
            case 'dropdown':
                element =
                    <>
                        <div className="form-group">
                            <label>{data.dropdown.titleDataDropdown.valueEn}</label>
                            <Select
                                value={this.state.selectedValue}
                                options={this.buildDataOption(data.dropdown?.dataDropdown)}
                                onChange={this.handleOnChangeSelect}
                                name='selectedValue'
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
                    </>
                break;
            default:
                break;
        }
        return element
    }

    render() {
        let element = this.buildInput()
        return (
            <>
                {element && element}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RenderInput));