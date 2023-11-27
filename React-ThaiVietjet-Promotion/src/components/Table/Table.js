import { Component } from "react";
import './Table.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func } from 'utils'

// Usage

{/* <Table 
    data={banners.data}
    thead={['Id', 'Name', 'Image Mobile', 'Image Desktop']}
    tbody={['id', 'name',
        { name: 'imageMobile', type: 'image' },
        { name: 'imageDesktop', type: 'image' },
        { key1: 'k', key2: 'k', type: 'object'}
    ]}
    actions={(data) =>
        <>
            <button type="button" className="btn btn-warning mx-1"
                onClick={() => this.handleUpdate(data)}>Update</button>
            <button type="button" className="btn btn-danger mx-1"
                onClick={() => this.handleDelete(data)}>Delete</button>
        </>
    }
/> */}

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

    renderObject = (parentObject, object) => {
        return parentObject[object.key1][object.key2]
    }

    render() {
        let { data, thead, tbody, actions } = this.props
        return (
            <>
                {data && data.length > 0 &&
                    <table
                        className="table table-header"
                    >
                        <thead
                            className="thead-light"
                        >
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
                            {tbody && data.map((item) => {
                                return (
                                    <tr>
                                        {tbody && tbody.map((itemTbody, index) => {
                                            if (index === 0) {
                                                return (
                                                    <th key={index}>{item?.[itemTbody]}</th>
                                                )
                                            } else {
                                                let type = typeof (itemTbody)
                                                if (type === 'string') {
                                                    return (
                                                        <td key={index}>{item?.[itemTbody]}</td>
                                                    )
                                                } else if (Array.isArray(itemTbody)) {
                                                    return (
                                                        <td>
                                                            {func.OBJECT(item, itemTbody)}
                                                        </td>
                                                    )
                                                } else if (type === 'object') {
                                                    if (itemTbody.type === 'image') {
                                                        return (
                                                            <td>
                                                                {item?.[itemTbody?.name] &&
                                                                    <img src={item?.[itemTbody?.name]} />}
                                                            </td>
                                                        )
                                                    } else if (itemTbody.type === 'object') {
                                                        return (
                                                            <td>
                                                                {item?.[itemTbody.key1]?.[itemTbody.key2]}
                                                            </td>
                                                        )
                                                    } else if (itemTbody.type === 'boolean') {
                                                        return (
                                                            <td>
                                                                {item?.[itemTbody.key] ? 'Yes' : 'No'}
                                                            </td>
                                                        )
                                                    }
                                                }
                                            }
                                        })}
                                        {actions &&
                                            <td className="col-md-4">
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