import { Component } from "react";
// import './PromotionForm.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func, component } from 'utils'
import { createPromotion, updatePromotion } from "services/promotionService";

class PromotionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.mapStateRoute()
    }

    mapStateRoute = () => {
        func.MAP_STATE_ROUTE(this, {},
            {
                object: 'promotion',
                property: ['id', 'name']
            }
        )
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onCreate = () => {
        func.HANDLE_CREATE_UPDATE_V2(this,
            ['name'],
            {
                func: createPromotion,
                callBack: () => { func.NAV(this, -1) }
            },
            {
                func: updatePromotion,
                property: ['id'],
                callBack: () => { func.NAV(this, -1) }
            }
        )
    }

    render() {
        let type = this.props.params?.type
        return (
            <>
                <div className="row">
                    {type === 'update' &&
                        <div class="form-group col-md-2">
                            <label for="id">{'Id (Promotion Id)'}</label>
                            <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                value={this.state.id} disabled
                                onChange={(event) => func.ONCHANGE_TEXT(this, 'id', event)}
                            />
                        </div>
                    }
                    <div class="form-group col-md-2">
                        <label for="id">Name</label>
                        <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                            value={this.state.name}
                            onChange={(event) => func.ONCHANGE_TEXT(this, 'name', event)}
                        />
                    </div>
                </div>
                <div className="row px-3">
                    {component.BUTTON_SUBMIT(this, this.onCreate, 'mr-2')}
                    <button
                        className="btn btn-dark mr-auto"
                        onClick={() => func.NAV(this, -1)}
                    >
                        Cancel
                    </button>
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
        // funcReact: () => dispatch(actions.funcRedux())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PromotionForm));