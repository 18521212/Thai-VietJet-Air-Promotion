import { Component } from "react";
import './Footer.scss';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import withRouter from 'components/withRouter/withRouter';
import { association } from "utils";

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
        let footer = this.props?.footer?.data
        let { language } = this.props
        return (
            <>
                <hr />
                <div className='footer'>
                    <div className="link-panel">
                        <a href="#" data-toggle="modal" data-target="#termModal">Terms and Conditions</a>
                        |
                        <a href="#" data-toggle="modal" data-target="#faqModal">FAQ</a>
                        |
                        <a href="#" data-toggle="modal" data-target="#howtouseModal">How to use</a>
                        |
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

                    <div className="modal fade" id="faqModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">FAQ</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="accordion" id="accordionExample">
                                        {footer?.[association.FAQ_FOOTER] && footer?.[association.FAQ_FOOTER]?.[association.FAQ_FAQID].length > 0 &&
                                            footer[association.FAQ_FOOTER]?.[association.FAQ_FAQID].map((item, index) => {
                                                console.log('i', item)
                                                return (
                                                    <>
                                                        <div className="card">
                                                            <div className="card-header" id="headingOne"
                                                                data-toggle="collapse"
                                                                data-target={'#p2' + item.id}
                                                            >
                                                                <span className="mb-0">
                                                                    {index + 1}. {item.question}
                                                                </span>
                                                            </div>

                                                            <div
                                                                id={'p2' + item.id}
                                                                className={`collapse ${index === 0 && "show"}`}
                                                                aria-labelledby="headingOne"
                                                                data-parent="#accordionExample"
                                                            >
                                                                <div className="card-body">
                                                                    {item.answer}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {footer && footer?.[association.MARKDOWN_TERM_AND_CONDITION] &&
                        <div className="modal fade" id="termModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            {footer?.[association.MARKDOWN_TERM_AND_CONDITION].titleEn}
                                        </h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body"
                                        dangerouslySetInnerHTML={
                                            {
                                                __html: language === 'en' ?
                                                    footer?.[association.MARKDOWN_TERM_AND_CONDITION].contentEn
                                                    :
                                                    footer?.[association.MARKDOWN_TERM_AND_CONDITION].contentTh
                                            }
                                        }
                                    >

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {footer && footer?.[association.MARKDOWN_HOW_TO_USE] &&
                        <div className="modal fade" id="howtouseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            {footer?.[association.MARKDOWN_HOW_TO_USE].titleEn}
                                        </h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body"
                                        dangerouslySetInnerHTML={
                                            {
                                                __html: language === 'en' ?
                                                    footer?.[association.MARKDOWN_HOW_TO_USE].contentEn
                                                    :
                                                    footer?.[association.MARKDOWN_HOW_TO_USE].contentTh
                                            }
                                        }
                                    >

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        footer: state.admin.footer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadFooter: (id) => dispatch(actions.fetchFooter(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));