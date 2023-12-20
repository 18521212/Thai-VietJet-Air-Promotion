import initWebRoutes from './web'
import routeBanner from './route-banner'
import routeCampaign from './route-campaign'
import routeHeader from './route-header'
import routeBody from './route-body'
import routeForm from './route-form'
import routePromotion from './route-promotion'
import routeFooter from './route-footer'
import routePayment from './route-payment'
import routeDatafeed from './route-datafeed'

let mergeRoute = (app) => {
    initWebRoutes(app);
    routeBanner(app)
    routeCampaign(app)
    routeHeader(app)
    routeBody(app)
    routeForm(app)
    routePromotion(app)
    routeFooter(app)
    routePayment(app)
    routeDatafeed(app)
}

module.exports = mergeRoute;