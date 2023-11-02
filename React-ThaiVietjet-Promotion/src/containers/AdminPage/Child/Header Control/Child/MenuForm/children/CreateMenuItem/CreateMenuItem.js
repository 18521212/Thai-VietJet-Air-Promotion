import { Component } from "react";
import './CreateMenuItem.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
import withRouter from "components/withRouter/withRouter";
import { createMenuItem, updateMenuItem } from 'services/headerService';
import { component, func } from 'utils'

class CreateMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hightlightAllCode: {
                1: { code: 1, isHighlight: false, highlightStatusValue: 'none', highlightStatusLabel: 'None' },
                2: { code: 2, isHighlight: true, highlightStatusValue: 'default', highlightStatusLabel: 'Default Color' },
                3: { code: 3, isHighlight: true, highlightStatusValue: 'custom', highlightStatusLabel: 'Custom Color' }
            },
            selectedHighlightStatus: '',

            menuId: this.props.location.state.menuId,
            order: 0,
            english: '',
            thai: '',
            link: '',
            highlightColor: ''
        }
    }

    componentDidMount() {
        this.setState({
            selectedHighlightStatus: this.state.hightlightAllCode[1]
        })
        this.mapDataUpdate()
    }

    mapDataUpdate = () => {
        func.MAP_STATE_ROUTE(this, {}, {
            object: 'menuItem',
            property: ['id']
        })
        let { type } = this.props.params;
        let { menuItem } = this.props.location.state;
        if (type === 'update') {
            this.setState({
                order: menuItem.order,
                english: menuItem.textDataMenu_Item.valueEn,
                thai: menuItem.textDataMenu_Item.valueTh,
                link: menuItem.link,
                highlightColor: menuItem.highlight,
                selectedHighlightStatus: !menuItem.highlight ? this.state.hightlightAllCode[1] :
                    (menuItem.highlight === 'default' ? this.state.hightlightAllCode[2] : this.state.hightlightAllCode[3])
            })
        }
    }

    handleNavigate = (link) => {
        this.props.navigate(link)
    }

    handleHighlight = (code) => {
        this.setState({
            selectedHighlightStatus: this.state.hightlightAllCode[code],
            highlightColor: code !== 3 ? '' : this.state.highlightColor
        })
    }

    handleOnChangeText = (name, e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    handleSubmit = async () => {
        let { type } = this.props.params;
        let { menuId, order, english, thai, link, highlightColor, selectedHighlightStatus } = this.state
        let data = {};
        let res
        if (!type) {
            data.menuId = menuId
            data.order = order
            data.valueEn = english
            data.valueTh = thai
            data.link = link
            data.highlight = selectedHighlightStatus.code === 1 ? '' : (selectedHighlightStatus.code == 2 ? 'default' : highlightColor)
            res = await createMenuItem(data)
        } else if (type === 'update') {
            let { menuItem } = this.props.location.state;
            data.id = menuItem.id
            data.order = order
            data.valueEn = english
            data.valueTh = thai
            data.link = link
            data.highlight = selectedHighlightStatus.code === 1 ? '' : (selectedHighlightStatus.code == 2 ? 'default' : highlightColor)
            res = await updateMenuItem(data)
        }

        if (res.errCode === 0) {
            toast.success(res.errMessage)
        } else if (res.errCode === 1) {
            toast.error(res.errMessage)
        }
        res && res.errCode === 0 && this.props.navigate(-1)
        // console.log('data', data)
        // this.validate(menuId, order)
    }

    validate = (...args) => {
        args.map((item) => {
            console.log(item)
        })
    }

    render() {
        // console.log(this.props.location.state)
        let { selectedHighlightStatus } = this.state
        let { type } = this.props.params;
        return (
            <>
                <h3>{component.CR_UP_TEXT(this)} Menu Item</h3>
                <form className="create-menu-item-form form-row">
                    <div className="form-group col-1">
                        <label for="menuId col-form-label">Menu Id</label>
                        <input value={this.state.menuId} onChange={(e) => this.handleOnChangeText('menuId', e)}
                            className="form-control" disabled id='menuId'
                        />
                    </div>
                    {type === 'update' &&
                        <>
                            <div className="form-group">
                                <label for="exampleInputEmail1">{'Id (Menu Item Id)'}</label>
                                <input className="form-control" value={this.state?.id}
                                    type='text' disabled />
                            </div>
                            <div className="w-100"></div>
                        </>
                    }
                    <div className="form-group col-2">
                        <label for="order">Order</label>
                        <input value={this.state.order} onChange={(e) => this.handleOnChangeText('order', e)}
                            className="form-control" placeholder="Order" id='order'
                        />
                    </div>
                    <div className="form-group col-4">
                        <label for="english">English Text</label>
                        <input value={this.state.english} onChange={(e) => this.handleOnChangeText('english', e)}
                            className="form-control" placeholder="Enter your English text" id='english'
                        />
                    </div>
                    <div className="form-group col-4">
                        <label for="thai">Thai Text</label>
                        <input value={this.state.thai} onChange={(e) => this.handleOnChangeText('thai', e)}
                            className="form-control" placeholder="Enter your Thai text" id='thai'
                        />
                    </div>
                    <div className="form-group col-6">
                        <label for="link">Link</label>
                        <input value={this.state.link} onChange={(e) => this.handleOnChangeText('link', e)}
                            className="form-control" placeholder="Enter link" id='link'
                        />
                        <small id="thaiText" class="form-text text-muted">Notice: If this menu item has sub menu, the link will be disabled in production menu</small>
                    </div>
                    <div className="col-5">
                        <label for="link">Highlight Color</label>
                        <div class="input-group">
                            <input type="text" className="form-control col-8" aria-label="Text input with dropdown button"
                                value={this.state.highlightColor} disabled={selectedHighlightStatus.code !== 3 && 'disabled'}
                                onChange={(e) => this.handleOnChangeText('highlightColor', e)} />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">{selectedHighlightStatus.highlightStatusLabel}</button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" onClick={() => this.handleHighlight(1)}>None</a>
                                    <a class="dropdown-item" onClick={() => this.handleHighlight(2)}>Default Color</a>
                                    <a class="dropdown-item" onClick={() => this.handleHighlight(3)}>Custom color</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100"></div>
                    <button type="button" className={`btn ${type === 'update' ? 'btn-warning' : 'btn-primary'} mx-1`} onClick={() => this.handleSubmit()}>
                        {type === 'update' ? 'Save' : 'Create Menu Item'}</button>
                    <button type="button" className="btn btn-dark mx-1" onClick={() => this.handleNavigate(-1)}>Cancel</button>
                </form>
            </>
        )
    }
}

export default withRouter(CreateMenuItem); 