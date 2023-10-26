import { Component } from "react";
// import './PromotionSelect.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table"
import { func, api } from 'utils'
import { deletePromotion } from "services/promotionService";

class PromotionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.loadPromotion()
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    onDelete = (data) => {
        func.HANDLE_DELETE('Delete this item?', data, deletePromotion, () => { this.props.loadPromotion() })
    }

    render() {
        // console.log('pr', this.props)
        let promotions = this.props.promotions
        return (
            <>
                <div className="row px-3 mb-1">
                    <button className="btn btn-primary mr-auto"
                        onClick={() => func.NAV(this, -1)}
                    >Back</button>
                    <button className="btn btn-success ml-auto"
                        onClick={() => func.NAV(this, '../promotion-form')}
                    >Create</button>
                </div>
                <Table
                    data={promotions.data}
                    thead={['Id', 'Name']}
                    tbody={['id', 'name']}
                    actions={(data) =>
                        <>
                            {data?.pack?.length > 0 ?
                                <button className="btn btn-primary mr-2"
                                    onClick={() => func.NAV(this, '../pack-select', { promotion: data })}
                                >View Packs</button>
                                :
                                <button className="btn btn-success mr-2"
                                    onClick={() => func.NAV(this, '../pack-form', { promotion: data })}
                                >Add Packs</button>
                            }
                            <button className="btn btn-warning mr-2"
                                onClick={() => func.NAV(this, '../promotion-form/update', { promotion: data })}
                            >Update</button>
                            <button className="btn btn-danger" disabled={data.pack.length > 0 ? 'disabled' : ''}
                                onClick={() => this.onDelete(data)}
                            >Delete</button>
                        </>
                    }
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        promotions: state.admin.promotions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadPromotion: (id) => dispatch(actions.fetchPromotion(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PromotionSelect));