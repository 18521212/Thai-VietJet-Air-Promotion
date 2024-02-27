import routeBanner from './route-banner'
import routeCampaign from './route-campaign'
import routeHeader from './route-header'
import routeBody from './route-body'
import routeForm from './route-form'
import routePromotion from './route-promotion'
import routeFooter from './route-footer'
import routePayment from './route-payment'
import routeDatafeed from './route-datafeed'
import { validateFrontEndApp } from "../middleware/validateFrontEndApp";
import { Logger } from '../class/Logger/Logger'

let mergeRoute = (app) => {
    // -- log file
    app.use(
        (req, res, next) => {
            res.on("finish",
                function () {
                    let _logger = new Logger(req, res)
                    _logger.consoleLog()
                });
            next();
        }
    );
    // --< log file
    app.use(validateFrontEndApp);

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