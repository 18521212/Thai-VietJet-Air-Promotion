import { Component } from "react";
// import './PackSelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table"
import { func, api } from 'utils'
import { deletePack } from "services/promotionService";

class PackSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.loadPromotion()
    }

    loadPromotion = () => {
        let promotion = this.props.location.state?.promotion
        promotion && promotion.id && this.props.loadPromotion(promotion.id)
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onDelete = (data) => {
        let promotion = this.props.location.state?.promotion
        func.HANDLE_DELETE('Delete this item?', data, deletePack, () => { this.props.loadPromotion(promotion.id) })
    }

    render() {
        let promotion = this.props.promotion
        let packs = this.props.promotion?.data?.pack
        return (
            <>
                <div className="row px-3 mb-1">
                    <button className="btn btn-primary mr-auto"
                        onClick={() => func.NAV(this, '../../promotion')}
                    >Back</button>
                    <button className="btn btn-success ml-auto"
                        onClick={() => func.NAV(this, '../pack-form', { promotion: this.props.promotion.data })}
                    >Create</button>
                </div>
                {packs && packs.length > 0 &&
                    <>
                        <div class="form-group col-md-2">
                            <label for="id">Promotion Id</label>
                            <input type="text" class="form-control" id="id" aria-describedby="emailHelp"
                                value={promotion.data.id} disabled
                            />
                        </div>
                        <div className="w-100"></div>
                        <Table
                            data={packs}
                            thead={['Id', 'Name', 'Price', 'Max Number', 'Number Redeem', 'Currency']}
                            tbody={['id', 'name', 'price', 'maxNumber', 'numberRedeem', 'currency']}
                            actions={(data) =>
                                <>
                                    <button className="btn btn-warning mr-2"
                                        onClick={() => func.NAV(this, '../pack-form/update', { pack: data })}
                                    >Update</button>
                                    <button className="btn btn-danger"
                                        onClick={() => this.onDelete(data)}
                                    >Delete</button>
                                </>
                            }
                        />
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        promotion: state.admin.promotion
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadPromotion: (id) => dispatch(actions.fetchPromotion(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PackSelect));