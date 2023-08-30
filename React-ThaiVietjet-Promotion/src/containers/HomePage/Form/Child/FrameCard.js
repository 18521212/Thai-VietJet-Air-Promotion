import { Component } from "react";
import Select from 'react-select';
import './FrameCard.scss'
import _ from 'lodash';

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
                <div className="frame-pack container-fluid">
                    <div className="row">
                        {packData && packData.length > 0 &&
                            packData.map((item, index) => {
                                let price = item.price;
                                let stateName = _.camelCase('selected' + item.name);
                                let optionStateName = _.camelCase('option' + item.name);// space
                                let name = {
                                    parentState: 'inputFrameCard',
                                    name: stateName
                                }
                                return (
                                    <div className="card col-xl-4 col-12" key={index}>
                                        <div className="card-header">
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="content-up col-7">
                                                    <span>Price {price} THB</span>
                                                </div>
                                            </div>

                                            <div className="content-down">
                                                <div className="form-group row">
                                                    <label className="col">Number</label>
                                                    <Select className="select-count col"
                                                        value={inputFrameCard[stateName]}
                                                        options={inputFrameCard[optionStateName]}
                                                        name={name}
                                                        onChange={this.handleOnChangeSelect}
                                                        styles={{
                                                            indicatorSeparator: () => { },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default FrameCard;