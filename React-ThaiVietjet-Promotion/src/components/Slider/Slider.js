import { Component } from "react";
import './Slider.scss'
import _ from 'lodash';
import * as actions from 'store/actions';
import withRouter from "components/withRouter/withRouter"
import { connect } from 'react-redux'
import { func } from 'utils'

class Slider extends Component {
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
        let data = this.props?.data
        let className = this.props?.className
        let property = this.props?.property
        let id = this.props?.id
        return (
            <>
                {data && data?.length > 0 && property &&
                    <div div id={`carouselExampleIndicators${id}`} className={`carousel slide ${className}`} data-ride="carousel">
                        <ol class="carousel-indicators">
                            {
                                data.map((item, index) => {
                                    return (
                                        <li data-target={`#carouselExampleIndicators${id}`} data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                                    )
                                })
                            }
                        </ol>
                        <div class="carousel-inner">
                            {data.map((item, index) => {
                                return (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img className="d-block w-100 img-fluid" src={func.OBJECT(item, property)} alt="Image Slide" />
                                    </div>
                                )
                            })}
                        </div>
                        <a class="carousel-control-prev" href={`#carouselExampleIndicators${id}`} role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href={`#carouselExampleIndicators${id}`} role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slider));