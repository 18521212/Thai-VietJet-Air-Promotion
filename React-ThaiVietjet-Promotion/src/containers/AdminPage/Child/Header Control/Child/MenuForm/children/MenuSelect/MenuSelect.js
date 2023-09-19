import { Component } from "react";
import './MenuSelect.scss';
import _ from 'lodash';
import Select from 'react-select';
import withRouter from "components/withRouter/withRouter";
import { getAllMenuItemByMenuId, deleteMenu } from "services/userService";

class MenuSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionMenu: '',
            checkHasMenuItem: {}
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.optionMenu !== this.props.optionMenu) {

        }
    }

    onClickCreate = () => {
        this.props.navigate('menu-create')
    }

    onClickDelete = async (id) => {
        let res = await deleteMenu({ id: id })
        alert(res.errMessage)
    }

    handleNavigate = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        return (
            <>
                <div className="row px-3 my-1">
                    {<Select className="select-menu col-md-4 col-8 p-0"
                        value={this.props.selectedMenu}
                        options={this.props.optionMenu}
                        name={'selectedMenu'}
                        onChange={this.props.handleOnChangeSelect}
                        placeholder='Choose a menu'
                        isClearable={true}
                        isDisabled={false}
                        styles={{
                            indicatorSeparator: () => { },
                        }}
                        menuPosition="fixed"
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey'
                            }
                        })}
                    />}
                    <div className="border-right m-2"></div>
                    <button className="btn btn-success" onClick={() => this.onClickCreate()}>+ Add new</button>
                    <div className="w-100"></div>
                    <div className="bg-danger text-white col-1 mx-auto">menu</div>
                </div>
                <div className="row px-3">
                    <table className="table table-menu col-12 table-striped">
                        <thead>
                            <tr className="table-danger">
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.optionMenu && this.props.optionMenu.map((item, index) => {
                                return (
                                    < tr key={index}>
                                        <td className="col-2">{item.value.id}</td>
                                        <td className="col-4">{item.value.name}</td>
                                        <td className="col-3">
                                            <button className="btn btn-success mx-1"
                                                onClick={() => this.handleNavigate('menu-item-select', { menuId: item.value.id })}>
                                                Menu Item</button>
                                            {item.value.Menu_Item.length === 0 &&
                                                <button className="btn btn-danger mx-1"
                                                    onClick={() => { this.onClickDelete(item.value.id) }}>
                                                    Delete</button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table >
                </div >
            </>
        )
    }
}

export default withRouter(MenuSelect);