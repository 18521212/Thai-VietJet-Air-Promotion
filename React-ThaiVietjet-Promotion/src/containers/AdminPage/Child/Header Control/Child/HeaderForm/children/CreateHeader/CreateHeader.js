import { Component } from "react";
import './CreateHeader.scss'
import _ from 'lodash';
import withRouter from "components/withRouter/withRouter";
import Select from 'react-select';
import { createHeader, updateHeader } from "services/userService";
import { toast } from 'react-toastify';
import { connect } from 'react-redux'
import * as actions from 'store/actions';

class CreateHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: '',
            imageLogoInput: '',
            imageBackgroundInput: '',
        }
    }

    componentDidMount() {
        this.mapDataUpdate()
    }

    mapDataUpdate = () => {
        if (!this.props.isUpdate) return
        let { selectedHeader } = this.props
        console.log(this.props.optionMenus.filter(item => item.value.id === this.props.selectedHeader.menuId))
        if (selectedHeader) {
            this.setState({
                imageLogoInput: selectedHeader.imageLogo,
                imageBackgroundInput: selectedHeader.imageBackground,
                selectedMenu: this.props.optionMenus.filter(item => item.value.id === this.props.selectedHeader.menuId)
            })
        }
    }

    handleOnChangeSelect = (selectedOption, actions) => {
        this.setState({ [actions.name]: selectedOption })
    }

    handleOnChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateHeader = async (event) => {
        let { imageLogoInput, imageBackgroundInput, selectedMenu } = this.state;
        let res
        let data = {
            imageLogo: imageLogoInput,
            imageBackground: imageBackgroundInput,
            menuId: selectedMenu && selectedMenu.value && selectedMenu.value.id
        }
        switch (this.props.isUpdate) {
            case false:
                res = await createHeader(data)
                break
            case true:
                let { selectedHeader } = this.props
                data.id = selectedHeader.id
                res = await updateHeader(data)
                break
            default:
        }
        res.errCode === 0 && this.backHeaderSelect()
        res.errCode === 0 ? toast.success(res.errMessage) : toast.error(res.errMessage)
    }

    backHeaderSelect = () => {
        this.props.setParentState('selectedPageHeader', this.props.pageHeader[1])
    }

    render() {
        return (
            <>
                <h1>create header</h1>
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
                            options={this.props.optionMenus}
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
                    <button type="button" className={`btn ${this.state.isUpdateHeader ? 'btn-warning' : 'btn-primary'} mx-1`}
                        onClick={(event) => this.handleCreateHeader(event)}
                    >{this.state.isUpdateHeader ? 'Update' : 'Create'}</button>
                    <button type="button" className="btn btn-secondary mx-1"
                        onClick={() => this.backHeaderSelect()}
                    >Cancel</button>
                </form>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuData: state.admin.menus,
        optionMenus: state.admin.optionMenus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // loadMenu: () => dispatch(actions.fetchMenu())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateHeader));