import { Component } from "react";
import './HeaderForm.scss'
import _ from 'lodash';
import Select from 'react-select';
import {
    getHeader, createHeader, deleteHeader,
    getAllMenu
} from "services/headerService";
import {
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import HeaderSelect from "./children/HeaderSelect/HeaderSelect";
import CreateHeader from "./children/CreateHeader/CreateHeader";

class HeaderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHeader: '',

            imageLogo: '',
            imageBackground: '',

            imageLogoInput: '',
            imageBackgroundInput: '',
            isUpdate: false,
            selectedHeader: '',

            pageHeader: {
                1: { code: 1, name: 'header-select' },
                2: { code: 2, name: 'create-header' },
            },
            selectedPageHeader: { code: 1, name: 'header-select' }
        }
    }

    componentDidMount() {
        this.buildDataAndMapState()
    }

    componentDidUpdate(prevProps, prevState) {

    }

    buildDataAndMapState = async () => {
        let listHeader = await getHeader();

        this.setState({
            listHeader: listHeader.data,
        })
    }

    setParentState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    renderSwitch = (param) => {
        switch (param) {
            case 'header-select':
                return <HeaderSelect pageHeader={this.state.pageHeader} setParentState={this.setParentState} />
            case 'create-header':
                return <CreateHeader pageHeader={this.state.pageHeader} setParentState={this.setParentState}
                    isUpdate={this.state.isUpdate} selectedHeader={this.state.selectedHeader} />
            default:
                return <HeaderSelect pageHeader={this.state.pageHeader} setParentState={this.setParentState} />
        }
    }

    render() {
        let { listHeader, imageLogo, imageBackground } = this.state;
        return (
            <>
                <div className='header-form container-fluid'>
                    <h3>Header Section</h3>
                    <hr></hr>
                    {
                        this.renderSwitch(this.state.selectedPageHeader.name)
                    }
                </div>
            </>
        )
    }
}

export default HeaderForm;