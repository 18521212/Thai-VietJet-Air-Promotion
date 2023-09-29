import { Component } from "react";
import _ from 'lodash';
import SelectReact from 'react-select';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <SelectReact className="select-number"
                    value={this.props.value}
                    options={this.props.options}
                    name={this.props.name}
                    onChange={this.props.onChange}
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
            </>
        )
    }
}

export default Select;