import { Component } from "react";
import './HeaderForm.scss'
import _ from 'lodash';
import Select from 'react-select';
import {
    getAllHeader, createHeader, deleteHeader,
    getAllMenu
} from "../../../../../../services/userService";

class HeaderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listHeader: '',

            optionMenu: '',
            selectedMenu: '',

            imageLogo: '',
            imageBackground: '',

            imageLogoInput: '',
            imageBackgroundInput: '',

            isUpdateHeader: false,
            isShowCreateForm: false,
        }
    }

    componentDidMount() {
        this.buildDataAndMapState()
    }

    componentDidUpdate(prevProps, prevState) {
        // option menu
        if (prevProps.listMenu !== this.props.listMenu) {
            let optionMenu = [];
            this.props.listMenu.map((item) => {
                optionMenu.push({ value: { ...item }, label: item.name })
            })

            this.setState({ optionMenu: optionMenu })
        }
    }

    handleOnChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    buildDataAndMapState = async () => {
        let listHeader = await getAllHeader();

        this.setState({
            listHeader: listHeader.data,
        })
    }

    handleCreateHeader = async (event) => {
        let { imageLogoInput, imageBackgroundInput, selectedMenu } = this.state;
        if (!imageLogoInput || !imageBackgroundInput) {
            alert('Missing parameters')
            return;
        }

        let res = await createHeader({
            imageLogo: imageLogoInput,
            imageBackground: imageBackgroundInput,
            menuId: selectedMenu && selectedMenu.value && selectedMenu.value.id
        })


        if (res.errCode === 0) {
            this.buildDataAndMapState()
        }
        this.clearForm()

        alert(res.errMessage)
    }

    handleDeleteHeader = async (headerId) => {
        if (window.confirm('Are you sure you wish to delete this item?') === true) {
            let res = await deleteHeader(headerId)
            if (res.errCode === 0) {
                this.buildDataAndMapState()
            }
            this.clearForm()

            alert(res.errMessage)
        } else {
            return;
        }

    }

    clearForm = () => {
        this.setState({
            imageLogoInput: '',
            imageBackgroundInput: '',
            selectedMenu: ''
        })
    }

    handleOnChangeSelect = (selectedOption, actions) => {
        this.setState({ [actions.name]: selectedOption })
    }

    toggle = (name) => {
        let stateCopy = this.state[name]
        this.setState({
            [name]: !stateCopy
        })
    }

    render() {
        let { listHeader, imageLogo, imageBackground } = this.state;
        return (
            <>
                <div className='header-form'>
                    <h3>Header Form</h3><br />

                    {this.state.isShowCreateForm &&
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Logo Image</label>
                                    <input value={this.state.imageLogoInput} name='imageLogoInput' parentState='headerFormInput'
                                        onChange={(event) => this.handleOnChangeText(event)} type="text"
                                        class="form-control" placeholder="Logo Image"
                                    />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputPassword4">Background Image</label>
                                    <input value={this.state.imageBackgroundInput} name='imageBackgroundInput' parentState='headerFormInput'
                                        onChange={(event) => this.handleOnChangeText(event)} type="text"
                                        class="form-control" placeholder="Background Image"
                                    />
                                </div>

                                <Select className="select-menu col-md-4 p-0"
                                    value={this.state.selectedMenu}
                                    options={this.state.optionMenu}
                                    name={'selectedMenu'}
                                    onChange={this.handleOnChangeSelect}
                                    placeholder='Adding menu'
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
                            <button type="button" className={`btn ${this.state.isUpdateHeader ? 'btn-warning' : 'btn-primary'}`}
                                onClick={(event) => this.handleCreateHeader(event)}
                            >{this.state.isUpdateHeader ? 'Update' : 'Create'}</button>
                            <button className="btn btn-secondary"
                                onClick={() => this.toggle('isShowCreateForm')}
                            >Cancel</button>
                        </form>
                    }


                    <table className="table table-header">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">id</th>
                                <th scope="col">Logo Image</th>
                                <th scope="col">Background Image</th>
                                <th scope="col">Menu Panel Id</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listHeader && listHeader.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.id}</td>
                                        <td><img src={item.imageLogo} /></td>
                                        <td><img src={item.imageBackground} /></td>
                                        <td>{item.menuId ? item.menuId : '*'}</td>
                                        <td>
                                            <input value='Update' type="button" class="btn btn-warning"
                                                onClick={() => this.handleUpdateHeader(item.id)}
                                            />
                                            <input value='Delete' type="button" class="btn btn-danger"
                                                onClick={() => this.handleDeleteHeader(item.id)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                            {!this.state.isShowCreateForm &&
                                <tr>
                                    <td colSpan={100}>
                                        <input value='+ Add New' type="button" class="btn btn-success"
                                            onClick={() => this.toggle('isShowCreateForm')}
                                        />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default HeaderForm;