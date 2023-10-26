import { Component } from "react";
import './CreateHeader.scss'
import _ from 'lodash';
import withRouter from "components/withRouter/withRouter";
import Select from 'react-select';
import { createHeader, updateHeader } from "services/userService";
import { toast } from 'react-toastify';
import { connect } from 'react-redux'
import * as actions from 'store/actions';
import { CommonUtils, component } from "utils";
// import bsCustomFileInput from 'bs-custom-file-input'

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
        this.loadData()
        this.mapDataUpdate()
    }

    loadData = async () => {
        await this.props.loadMenu()
    }

    mapDataUpdate = () => {
        if (!this.props.isUpdate) return
        let { selectedHeader } = this.props
        if (selectedHeader) {
            this.setState({
                imageLogoInput: selectedHeader.imageLogo,
                imageBackgroundInput: selectedHeader.imageBackground,
                selectedMenu: this.props.menuOption.filter(item => item.value.id === this.props.selectedHeader.menuId)
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
        res?.errCode === 0 && this.backHeaderSelect()
        res?.errCode === 0 ? toast.success(res?.errMessage) : toast.error(res?.errMessage)
    }

    backHeaderSelect = () => {
        this.props.setParentState('selectedPageHeader', this.props.pageHeader[1])
    }

    handleOnchangeImage = async (name, event) => {
        let data = event.target.files;
        let file = data[0];
        event.target.nextElementSibling.innerText = file.name // show file name
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                // previewImgURL: objectUrl,
                [name]: base64
            })
        }
    }

    render() {
        console.log()
        return (
            <>
                <h1>create header</h1>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Logo Image</label>
                            <div class="custom-file">
                                <input type="file" className="custom-file-input" id="validatedCustomFile"
                                    onChange={(event) => this.handleOnchangeImage('imageLogoInput', event)}
                                />
                                <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Background Image</label>
                            <div class="custom-file">
                                <input type="file" className="custom-file-input" id="validatedCustomFile"
                                    onChange={(event) => this.handleOnchangeImage('imageBackgroundInput', event)}
                                />
                                <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                            </div>
                        </div>

                        <Select className="select-menu col-md-4 form-group"
                            value={this.state.selectedMenu}
                            options={this.props.menuOption}
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
                        <div className="w-100"></div>
                        <button type="button" className={`btn ${this.props.isUpdate ? 'btn-warning' : 'btn-primary'} mx-1`}
                            onClick={(event) => this.handleCreateHeader(event)}
                        >{this.props.isUpdate ? 'Update' : 'Create'}</button>
                        <button type="button" className="btn btn-secondary mx-1"
                            onClick={() => this.backHeaderSelect()}
                        >Cancel</button>
                    </div>
                </form>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuData: state.admin.menus,
        menuOption: state.admin.menuOption
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMenu: (id) => dispatch(actions.fetchMenu(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateHeader));