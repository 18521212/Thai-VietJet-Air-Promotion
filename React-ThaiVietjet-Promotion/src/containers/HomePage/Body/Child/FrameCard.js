import { Component } from "react";
import Select from 'react-select';
import './FrameCard.scss'

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
        let { listPack, selectedNoPack4, selectedNoPack6,
            selectedNoPack12, selectedNoPack24 } = this.props;
        return (
            <>
                <div className="frame-pack container-fluid">
                    <div className="row">
                        {listPack && listPack.length > 0 &&
                            listPack.map((item, index) => {
                                let option = [];
                                let selectedNoPack = this.props['selectedNoPack' + item.id]
                                for (let i = 0; i <= item.code_number; i++) {
                                    option.push({ value: i, label: i })
                                }
                                return (
                                    <div className="card col-xl-4 col-12" key={index}>
                                        <div className="card-header">
                                            <span>{item.pack_name}</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="content-up col-7">
                                                    <span>Price {item.price} THB</span>
                                                </div>
                                            </div>

                                            <div className="content-down">
                                                <div className="form-group row">
                                                    <label className="col">Number</label>
                                                    <Select className="select-count col"
                                                        value={selectedNoPack}
                                                        placeholder={selectedNoPack.value}
                                                        options={option}
                                                        name={'selectedNoPack' + item.id}
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