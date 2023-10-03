import { Component } from "react";
import './Table.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleOnChangeSelect = (selectedValue, actions) => {
        this.props.setState({ [actions.name]: selectedValue })
    }

    handleNav = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        let { data, thead, tbody, actions } = this.props
        return (
            <>
                {data &&
                    <table className="table">
                        <thead>
                            <tr>
                                {thead && thead.map((item, index) => {
                                    return (
                                        <th scope="col" key={index}>{item}</th>
                                    )
                                })
                                }
                                {actions &&
                                    <th scope="col">Actions</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                return (
                                    <tr>
                                        {tbody && tbody.map((itemTbody, index) => {
                                            if (index === 0) {
                                                return (
                                                    <th>{item?.[itemTbody]}</th>
                                                )
                                            } else {
                                                if (typeof (itemTbody) === 'string') {
                                                    return (
                                                        <td>{item?.[itemTbody]}</td>
                                                    )
                                                } else if (typeof (itemTbody) === 'object') {
                                                    if (itemTbody.type === 'image') {
                                                        return (
                                                            <td>
                                                                {item?.[itemTbody?.name] &&
                                                                    <img src={item?.[itemTbody?.name]} />}
                                                            </td>
                                                        )
                                                    }
                                                }
                                            }
                                        })}
                                        {actions &&
                                            <td>
                                                {actions(item)}
                                            </td>
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Table));