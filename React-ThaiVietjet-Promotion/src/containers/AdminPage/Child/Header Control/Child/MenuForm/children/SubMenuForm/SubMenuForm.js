import { Component } from "react";
import './SubMenuForm.scss'
import _ from 'lodash';
import withRouter from "components/withRouter/withRouter";

class SubMenuForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleNavigate = (link) => {
        this.props.navigate(link)
    }

    render() {
        return (
            <>
                <form className="form-row">
                    <div class="form-group col-2">
                        <label for="menuItemParentId">Id menu item parent</label>
                        <input class="form-control" id="menuItemParentId" aria-describedby="emailHelp" placeholder="id" disabled />
                    </div>
                    <div class="form-group col-1">
                        <label for="exampleInputPassword1">Order</label>
                        <input value={0} class="form-control" id="exampleInputPassword1" placeholder="Order" />
                    </div>
                    <div class="form-group col-4">
                        <label for="exampleInputPassword1">Text English</label>
                        <input class="form-control" id="exampleInputPassword1" placeholder="Enter text English" />
                    </div>
                    <div class="form-group col-4">
                        <label for="exampleInputPassword1">Text Thai</label>
                        <input class="form-control" id="thaiText" placeholder="Enter text Thai" />
                        <small id="thaiText" class="form-text text-muted">This is optional, if you dont enter this, it will be set to the same as English text by default</small>
                    </div>
                    <div class="form-group col-5">
                        <label for="exampleInputPassword1">Link</label>
                        <input class="form-control" id="exampleInputPassword1" placeholder="Enter sub menu link" />
                    </div>
                    <div className="w-100"></div>
                    <button type="button" className="btn btn-primary">Create Menu</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.handleNavigate(-1)}>Cancel</button>
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

export default withRouter(SubMenuForm);