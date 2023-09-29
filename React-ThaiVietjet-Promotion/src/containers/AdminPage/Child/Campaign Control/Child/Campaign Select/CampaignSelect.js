import { Component } from "react";
import Select from 'react-select';
import './CampaignSelect.scss'
import _ from 'lodash';
import { getAllCampaign } from 'services/userService';
import CampaignForm from "../Campaign Form/CampaignForm";
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter";

class CampaignSelect extends Component {
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

    buildDataOption = () => {

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

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        let { selectedCampaign, optionCampaign, listCampaign, dataCampaign } = this.state;
        let show = (a) => {
            return a ?
                <>
                    <td>{a}</td>
                </>
                :
                <>
                    <td>Campaign hasn't this item yet</td>
                </>
        }
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="select-campaign col-md-5">
                            <label>Choose campaign</label>
                            <Select className="select-number"
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
                    </div>
                    <div className="row">
                        <div className="col">
                            {selectedCampaign &&
                                <>
                                    <div className="row px-3 my-1">
                                        <button className="btn btn-primary mr-auto mx-1">Back</button>
                                        <button className="btn btn-warning ml-auto mx-1"
                                            onClick={() => this.handleNav('../campaign-form')}>Update</button>
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Column</th>
                                                <th scope="col">Id</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Header</th>
                                                {show(selectedCampaign.value.headerId)}
                                            </tr>
                                            <tr>
                                                <th>Banner</th>
                                                {show(selectedCampaign.value.bannerId)}
                                            </tr>
                                            <tr>
                                                <th>Body</th>
                                                {show(selectedCampaign.value.bodyId)}
                                            </tr>
                                            <tr>
                                                <th>Form Section</th>
                                                {show(selectedCampaign.value.formSectionId)}
                                            </tr>
                                            <tr>
                                                <th>Footer</th>
                                                {show(selectedCampaign.value.footerId)}
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            }
                        </div>
                    </div>
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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignSelect));