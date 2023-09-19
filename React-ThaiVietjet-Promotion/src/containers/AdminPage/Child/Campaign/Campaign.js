import { Component } from "react";
import Select from 'react-select';
import './Campaign.scss'
import _ from 'lodash';
import { getAllCampaign } from '../../../../services/userService';

import CampaignForm from "./Child/Campaign Form/CampaignForm";
import HeaderControl from "../Header Control/HeaderControl";

class Campaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCampaign: '',
            selectedCampaign: '',
            optionCampaign: '',
            dataCampaign: '',
        }
    }

    componentDidMount() {
        this.buildDataAndMapState()
    }

    buildDataAndMapState = async () => {
        let dataCampaign = await getAllCampaign()

        let dataOption = [];
        dataCampaign.data.map((item, index) => {
            dataOption.push({ value: { ...item }, label: item.name })
        })

        this.setState({
            optionCampaign: dataOption,
            dataCampaign: dataCampaign.data
        })
    }

    handleOnChangeSelect = (selectedCampaign) => {
        this.setState({ selectedCampaign })
    }

    render() {
        let { selectedCampaign, optionCampaign, listCampaign, dataCampaign } = this.state;
        return (
            <>
                <div className="col-12">
                   

                    <div className='campaign'>
                        <div className="select-campaign">
                            <label>Choose campaign</label>
                            <Select className="select-number col-6 p-0"
                                value={selectedCampaign}
                                options={optionCampaign}
                                // name={name}
                                onChange={this.handleOnChangeSelect}
                                placeholder='Please choose an campaign'
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

                        {selectedCampaign && <CampaignForm
                            selectedCampaign={selectedCampaign}
                        />}
                    </div>
                </div>
            </>
        )
    }
}

export default Campaign;