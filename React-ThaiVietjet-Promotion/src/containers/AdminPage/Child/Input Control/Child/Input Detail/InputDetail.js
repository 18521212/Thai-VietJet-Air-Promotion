import { Component } from "react";
// import './InputDetail.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import Table from "components/Table/Table";
import { func } from 'utils'

class InputDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        let input = this.props.location.state?.input
        return (
            <>
                <h3>Input Detail</h3>
                <div className="row px-3 my-1">
                    <button className="btn btn-primary mr-auto mx-1"
                        onClick={() => func.NAV(this, -1)}
                    >Back</button>
                    <button className="btn btn-warning ml-auto mx-1"
                        onClick={() => func.NAV(this, `../input-form${input.typeInput==='dropdown'?'/dropdown':''}`)}
                    >Update</button>
                </div >
                {
                    input.typeInput === 'text' &&
                    <Table
                        data={[input]}
                        thead={['Input Id', 'Id',
                            'Title English', 'Title Thai',
                            'Place holder English', 'Place holder Thai',
                            'Type']}
                        tbody={['id',
                            ['text_input', 'id'],
                            ['text_input', 'titleDataText_Input', 'valueEn'],
                            ['text_input', 'titleDataText_Input', 'valueTh'],
                            ['text_input', 'placeHolderDataText_Input', 'valueEn'],
                            ['text_input', 'placeHolderDataText_Input', 'valueTh'],
                            ['text_input', 'typeText']
                        ]}
                    />
                }
                {
                    input.typeInput === 'dropdown' &&
                    <>
                        <Table
                            data={[input]}
                            thead={['Input Id', 'Id',
                                'Title English', 'Title Thai']}
                            tbody={['id',
                                ['dropdown', 'id'],
                                ['dropdown', 'titleDataDropdown', 'valueEn'],
                                ['dropdown', 'titleDataDropdown', 'valueTh'],
                            ]}
                        />
                        <Table
                            data={input.dropdown.dataDropdown}
                            thead={['Id', 'Value', 'Label']}
                            tbody={['id', 'value', 'label']}
                        />
                    </>
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputDetail));