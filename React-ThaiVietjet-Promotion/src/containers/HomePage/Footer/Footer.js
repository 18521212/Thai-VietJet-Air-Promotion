import { Component } from "react";
import './Footer.scss';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import withRouter from 'components/withRouter/withRouter';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = async () => {
        await this.props.loadFooter(this.props.footerId)
    }

    render() {
        let footer_text = this.props?.footer?.data?.footer_text
        return (
            <>
                <hr />
                <div className='footer'>
                    <div className="link-panel">
                        {footer_text && footer_text.length > 0 && footer_text.map((item, index) => {
                            let component
                            if (index === footer_text.length - 1) {
                                component =
                                    <a target="_blank" href={item.link}>{item.title}</a>
                            } else {
                                component =
                                    <>
                                        <a target="_blank" href={item.link}>{item.title}</a> |
                                    </>
                            }
                            return (
                                component
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        footer: state.admin.footer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadFooter: (id) => dispatch(actions.fetchFooter(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));