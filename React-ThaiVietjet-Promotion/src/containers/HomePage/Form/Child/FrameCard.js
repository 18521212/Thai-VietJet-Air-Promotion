import { Component } from "react";
import Select from 'react-select';
import './FrameCard.scss'
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import { func } from "utils";

class FrameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOnChangeSelect = (selectLanguageObject, action) => {
        this.props.handleOnChangeSelect(selectLanguageObject, action)
    }

    render() {
        let { packData, inputFrameCard } = this.props;
        return (
            <>
                <div className="row">
                    {packData && packData.length > 0 &&
                        packData.map((item, index) => {
                            let price = item.price;
                            let stateName = _.camelCase(item.name)+`-${item.id}`;
                            let optionStateName = _.camelCase('option' + item.name);// space
                            let name = {
                                parentState: 'inputFrameCard',
                                name: stateName
                            }
                            return (
                                <div className="card col-md-4 col-12" key={index}>
                                    <div className="card-header">
                                        <span>{item.name}</span>
                                    </div>
                                    <div className="card-body">
                                        <div className="row prize">
                                            <div className="col-md-6 col-5"></div>
                                            <div className="sell col-md-6 col-7">
                                                <span style={{ fontSize: '0.8em' }}>
                                                    Price <span>
                                                        <NumberFormat
                                                            className='currency'
                                                            value={price}
                                                            displayType='text'
                                                            thousandSeparator={true}
                                                            suffix={` ${item.currency}`}
                                                            fixedDecimalScale={true}
                                                        />
                                                    </span>
                                                </span>
                                            </div>

                                            <div className="col-12">
                                                <div className="row form-group">
                                                    <label className="col-6">Quantity</label>
                                                    <Select className="select-number col-6 p-0"
                                                        value={inputFrameCard[stateName]}
                                                        options={inputFrameCard[optionStateName]}
                                                        name={name}
                                                        onChange={this.handleOnChangeSelect}
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
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default FrameCard;