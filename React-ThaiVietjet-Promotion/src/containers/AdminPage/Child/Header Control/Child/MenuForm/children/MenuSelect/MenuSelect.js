import { Component } from "react";
import './MenuSelect.scss';
import _ from 'lodash';
import Select from 'react-select';
import { connect } from 'react-redux'
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter";
import { getAllMenuItemByMenuId, deleteMenu } from "services/userService";

class MenuSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionMenu: [],
            selectedMenu: '',

            checkHasMenuItem: {}
        }
    }

    componentDidMount() {
        this.props.loadMenu()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.menuData !== this.props.menuData) {
            this.buildDataAndMapState()
        }
    }

    buildDataAndMapState = () => {
        // option menu
        let optionMenu = [];
        this.props.menuData.data && this.props.menuData.data.map((item) => {
            optionMenu.push({ value: { ...item }, label: item.name })
        })

        this.setState({ optionMenu: optionMenu })
    }

    handleOnChangeSelect = (selectedOption, actions) => {
        if (actions.name === 'selectedMenu') {
            if (selectedOption && selectedOption.value.id) {
                // this.props.navigate('menu-item-select')
                this.props.navigate('menu-item-select', { state: { menuId: selectedOption.value.id } })
            } else {
                this.setState({ menuItem: '' })
            }
        }
        this.setState({ [actions.name]: selectedOption })
    }

    onClickCreate = () => {
        this.props.navigate('menu-create')
    }

    onClickDelete = async (id) => {
        let res = await deleteMenu({ id: id })
        alert(res.errMessage)
        this.props.loadMenu()
    }

    handleNavigate = (link, data) => {
        this.props.navigate(link, { state: data })
    }

    render() {
        let menuData = this.props?.menuData
        return (
            <>
                <div className="row px-3 my-1">
                    {<Select className="select-menu col-md-4 col-8 p-0"
                        value={this.state.selectedMenu}
                        options={this.state.optionMenu}
                        name={'selectedMenu'}
                        onChange={this.handleOnChangeSelect}
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
                    <div className="bg-danger text-white col-1 mx-auto" style={{height: '2rem'}}>MENU</div>
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
                            {menuData.data && menuData.data.map((item, index) => {
                                return (
                                    < tr key={index}>
                                        <td className="col-2">{item.id}</td>
                                        <td className="col-4">{item.name}</td>
                                        <td className="col-3">
                                            <button className="btn btn-success mx-1"
                                                onClick={() => this.handleNavigate('menu-item-select', { menuId: item.id })}>
                                                Menu Item</button>
                                            <button className="btn btn-warning mx-1"
                                                onClick={() => this.handleNavigate('menu-create/update', { menuId: item.id })}>
                                                Update</button>
                                            {item?.menu_item?.length === 0 &&
                                                <button className="btn btn-danger mx-1"
                                                    onClick={() => { this.onClickDelete(item.id) }}>
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

const mapStateToProps = state => {
    return {
        menuData: state.admin.menus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMenu: () => dispatch(actions.fetchMenu())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuSelect));