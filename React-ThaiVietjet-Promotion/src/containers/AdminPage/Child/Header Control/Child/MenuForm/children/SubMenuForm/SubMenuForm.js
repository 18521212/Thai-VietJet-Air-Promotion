import { Component } from "react";
import './SubMenuForm.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
import withRouter from "components/withRouter/withRouter";
import { createSubMenu, updateSubMenu } from "services/headerService";
import { connect } from "react-redux";
import * as actions from 'store/actions';
import { component } from 'utils'

class SubMenuForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuParentId: this.props.location.state ? this.props.location.state.menuParentId : '',
            order: 0,
            valueEn: '',
            valueTh: '',
            link: ''
        }
    }

    componentDidMount() {
        this.mapDataUpdate()
    }

    mapDataUpdate = () => {
        let { type } = this.props.params
        if (type !== 'update') {
            return
        }
        let { subMenu } = this.props.location.state
        this.setState({
            order: subMenu.order,
            valueEn: subMenu.textDataSub_Menu.valueEn,
            valueTh: subMenu.textDataSub_Menu.valueTh,
            link: subMenu.link
        })
    }

    handleNavigate = (link) => {
        this.props.navigate(link)
    }

    handleOnChangeText = (name, e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    handleSubmit = async () => {
        let { subMenu } = this.props.location.state
        console.log(subMenu)
        let { type } = this.props.params
        let { menuParentId, order, valueEn, valueTh, link } = this.state
        let data = {}, res
        if (!type) {
            data.menuParentId = menuParentId
            data.order = order
            data.valueEn = valueEn
            data.valueTh = valueTh
            data.link = link
            res = await createSubMenu(data)
        } else if (type === 'update') {
            data.id = subMenu.id
            data.order = order
            data.valueEn = valueEn
            data.valueTh = valueTh
            data.link = link
            res = await updateSubMenu(data)
        }
        if (res.errCode === 0) {
            toast.success(res.errMessage)
        } else if (res.errCode !== 0) {
            toast.error(res.errMessage)
        }
        res && res.errCode === 0 && this.props.navigate(-1)
    }

    render() {
        // console.log(this.props.location.state.subMenu)
        let { type } = this.props.params
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Sub Menu</h3>
                <form className="form-row">
                    <div class="form-group col-2">
                        <label for="menuItemParentId">Id menu item parent</label>
                        <input class="form-control" id="menuItemParentId" aria-describedby="emailHelp" placeholder="id" disabled
                            value={this.state.menuParentId} onChange={(e) => this.handleOnChangeText('menuParentId', e)} />
                    </div>
                    <div class="form-group col-1">
                        <label for="exampleInputPassword1">Order</label>
                        <input value={this.state.order} class="form-control" id="exampleInputPassword1" placeholder="Order"
                            onChange={(e) => this.handleOnChangeText('order', e)} />
                    </div>
                    <div class="form-group col-4">
                        <label for="exampleInputPassword1">Text English</label>
                        <input class="form-control" id="exampleInputPassword1" placeholder="Enter text English"
                            value={this.state.valueEn} onChange={(e) => this.handleOnChangeText('valueEn', e)} />
                    </div>
                    <div class="form-group col-4">
                        <label for="exampleInputPassword1">Text Thai</label>
                        <input class="form-control" id="thaiText" placeholder="Enter text Thai"
                            value={this.state.valueTh} onChange={(e) => this.handleOnChangeText('valueTh', e)} />
                        <small id="thaiText" class="form-text text-muted">This is optional, if you dont enter this field, it will be set to the same as English text by default</small>
                    </div>
                    <div class="form-group col-5">
                        <label for="exampleInputPassword1">Link</label>
                        <input class="form-control" id="exampleInputPassword1" placeholder="Enter sub menu link"
                            value={this.state.link} onChange={(e) => this.handleOnChangeText('link', e)} />
                    </div>
                    <div className="w-100"></div>
                    <button type="button" className={`btn ${type === 'update' ? 'btn-warning' : 'btn-primary'} mx-1`}
                        onClick={() => this.handleSubmit()}>
                        {type === 'update' ? 'Save' : 'Submit'}</button>
                    <button type="button" class="btn btn-secondary mx-1"
                        onClick={() => this.handleNavigate(-1)}>
                        Cancel</button>
                    {/* <input type="button" className="btn btn-primary" value='Create Menu' />
                    <input type="button" className="btn btn-secondary" value='Cancel' /> */}
                </form>
                {/* <div className="create-menu-item-form col-12">
                    <div className="form-row">
                        <input value={this.state.selectedMenu ? this.state.selectedMenu.value.id : ''}
                            className="form-control col-2"
                            disabled
                        />
                        <div className="w-100"></div>
                        <input value={this.state.imageLogoInput}
                            className="form-control col-6"
                            placeholder="Enter your English text"
                        />
                        <input value={this.state.imageLogoInput}
                            className="form-control col-6"
                            placeholder="Enter your Thai text"
                        />
                        <input value={this.state.imageLogoInput}
                            className="form-control col-6"
                            placeholder="Enter link"
                        />
                        <input value={this.state.imageLogoInput}
                            className="form-control col-1"
                            placeholder="Order"
                        />

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"
                                onChange={(e) => this.handleOnSelect(e)}
                            />
                            <label class="form-check-label" for="exampleCheck1">is Highlight</label>
                        </div>
                        {this.state.isCheckHightlight &&
                            <>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1"
                                        onChange={(e) => this.handleOnSelect(e)}
                                    />
                                    <label class="form-check-label" for="exampleCheck1">Default Color</label>
                                </div>
                                <input value={this.state.imageLogoInput}
                                    className="form-control col-2 disabled"
                                    placeholder="Highlight"
                                />
                            </>
                        }
                        <div className="w-100"></div>
                        <button className="btn btn-primary">Create Menu</button>
                        <button className="btn btn-secondary" onClick={() => this.handleNavigate(-1)}>Cancel</button>
                    </div>
                </div> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubMenuForm));