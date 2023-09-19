import { Component } from "react";
import './CreateMenuItem.scss'
import _ from 'lodash';
import withRouter from "components/withRouter/withRouter";

class CreateMenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHighlight: false,
            highLightStatus: 'None'
        }
    }

    handleNavigate = (link) => {
        this.props.navigate(link)
    }

    handleHighlight = (value, name) => {
        this.setState({
            isHighlight: value,
            highLightStatus: name
        })
    }

    render() {
        return (
            <>
                <div className="create-menu-item-form form-row">
                    <div className="form-group col-1">
                        <label for="menuId col-form-label">Menu Id</label>
                        <input value={this.state.selectedMenu ? this.state.selectedMenu.value.id : ''}
                            className="form-control"
                            disabled
                            id='menuId'
                        />
                    </div>
                    <div className="form-group col-2">
                        <label for="order">Order</label>
                        <input value={this.state.imageLogoInput}
                            className="form-control"
                            placeholder="Order" id='order'
                        />
                    </div>
                    <div className="form-group col-4">
                        <label for="english">English Text</label>
                        <input value={this.state.imageLogoInput}
                            className="form-control"
                            placeholder="Enter your English text" id='english'
                        />
                    </div>
                    <div className="form-group col-4">
                        <label for="thai">Thai Text</label>
                        <input value={this.state.imageLogoInput}
                            className="form-control"
                            placeholder="Enter your Thai text" id='thai'
                        />
                    </div>
                    <div className="form-group col-6">
                        <label for="link">Link</label>
                        <input value={this.state.imageLogoInput}
                            className="form-control"
                            placeholder="Enter link" id='link'
                        />
                        <small id="thaiText" class="form-text text-muted">Notice: If this menu item has sub menu, the link will be disabled in production menu</small>
                    </div>
                    <div className="col-5">
                        <label for="link">Highlight Color</label>
                        <div class="input-group">
                            <input type="text" className="form-control col-8" aria-label="Text input with dropdown button"
                                disabled={!this.state.isHighlight && 'disabled'} />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.highLightStatus}</button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" onClick={() => this.handleHighlight(false, 'None')}>None</a>
                                    <a class="dropdown-item" onClick={() => this.handleHighlight(false, 'Default')}>Default</a>
                                    <a class="dropdown-item" onClick={() => this.handleHighlight(true, 'Custom color')}>Custom color</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-100"></div>
                    <button className="btn btn-primary mx-1">Create Menu Item</button>
                    <button className="btn btn-secondary mx-1" onClick={() => this.handleNavigate(-1)}>Cancel</button>
                </div>
            </>
        )
    }
}

export default withRouter(CreateMenuItem);