import { Component } from "react";
import './MenuForm.scss'
import _ from 'lodash';
import Select from 'react-select';
import { getAllMenuItemByMenuId } from "../../../../../services/userService";

class MenuForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionMenu: '',
            selectedMenu: '',
        }
    }

    componentDidMount() {
        console.log('mount')
        this.buildDataAndMapState()
    }

    componentDidUpdate(prevProps, prevState) {
        // option menu
        if (prevProps.listMenu !== this.props.listMenu) {
            this.buildDataAndMapState()
        }
    }

    buildDataAndMapState = async () => {

        // option menu
        let optionMenu = [];
        this.props.listMenu && this.props.listMenu.map((item) => {
            optionMenu.push({ value: { ...item }, label: item.name })
        })

        this.setState({ optionMenu: optionMenu })
    }

    getAllMenuItemByMenuId = async (menuId) => {
        let menuItem = await getAllMenuItemByMenuId(menuId)
        this.setState({ menuItem: menuItem.data })
    }

    handleOnChangeSelect = (selectedOption, actions) => {
        if (selectedOption && selectedOption.value.id) {
            this.getAllMenuItemByMenuId(selectedOption.value.id)
        } else {
            this.setState({ menuItem: '' })
        }
        this.setState({ [actions.name]: selectedOption })
    }

    render() {
        let { menuItem } = this.state;
        return (
            <>
                <div className="menu-form">
                    <h3>Menu Form</h3>
                    <Select className="select-menu col-md-4 p-0"
                        value={this.state.selectedMenu}
                        options={this.state.optionMenu}
                        name={'selectedMenu'}
                        onChange={this.handleOnChangeSelect}
                        placeholder='Choose a menu'
                        isClearable={true}
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
                    />

                    {menuItem && menuItem.length > 0 && menuItem.map((item, index) => {

                    })}

                    {/* {menuItem && menuItem.length > 0 && menuItem.map((item, index) => {
                        return (
                            <>
                                <table className="table table-menu" key={index}>
                                    <thead
                                    // className="thead-light"
                                    >
                                        <tr className="table-success"><th colspan="6">Menu Item: {item.textDataMenu_Item.valueEn}</th></tr>
                                        <tr className="table-active">
                                            <th>id</th>
                                            <th>text</th>
                                            <th>link</th>
                                            <th>order</th>
                                            <th>highlight </th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.textDataMenu_Item.valueEn}</td>
                                            <td>{item.link}</td>
                                            <td>{item.order}</td>
                                            <td>{item.highLight}</td>
                                            <td>Actions</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {item.Sub_Menus.length > 0 &&
                                    <table className="table table-sub-menu">
                                        <thead
                                        // className="thead-light"
                                        >
                                            <tr className="table-danger">
                                                <th colSpan={4}>Sub Menu of Menu Item: {item.textDataMenu_Item.valueEn}</th>
                                            </tr>
                                            <tr className="table-active">
                                                <th>id menu item</th>
                                                <th>text</th>
                                                <th>link</th>
                                                <th>order</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.Sub_Menus.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{item.menuParentId}</td>
                                                        <td>{item.textDataSub_Menu.valueEn}</td>
                                                        <td>{item.link}</td>
                                                        <td>{item.order}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                }
                            </>
                        )
                    })} */}
                </div>
            </>
        )
    }
}

export default MenuForm;