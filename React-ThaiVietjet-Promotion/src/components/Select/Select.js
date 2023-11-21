import { Component } from "react";
import _ from 'lodash';
import SelectReact from 'react-select';
import { func } from 'utils';
import withRouter from "components/withRouter/withRouter";

// Usage

{/* <Select
    value='selectedBanner'
    options='bannerOption'
    nameProps='banner' (optional)
    linkNav='../banner-form' (optional)
    typeSelect='state' optional
    parent={this}
/> */}

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOnChange = (selectedValue, actions) => {
        this.props.parent.setState({ [actions.name]: selectedValue })
        this.props.linkNav && func.NAV(
            this,
            this.props.linkNav,
            { [this.props.nameProps]: selectedValue.value }
        )
    }

    render() {
        let parent = this.props.parent
        let typeSelect = this.props?.typeSelect
        return (
            <>
                {typeSelect === 'state' ?
                    <SelectReact className="select-number"
                        value={parent.state[this.props.value]}
                        options={parent.state[this.props.options]}
                        name={this.props.value}
                        onChange={this.handleOnChange}
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
                    :
                    <SelectReact className="select-number"
                        value={parent.state[this.props.value]}
                        options={parent.props[this.props.options]}
                        name={this.props.value}
                        onChange={this.handleOnChange}
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
                }
            </>
        )
    }
}

export default withRouter(Select);