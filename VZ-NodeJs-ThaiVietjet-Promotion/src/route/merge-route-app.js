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
import { logFile } from '../middleware/logFile'

let mergeRoute = (app) => {
    // app.use('*', validateFrontEndApp);
    // -- log file
    app.use(
        (req, res, next) => {
            res.on("finish",
                function () {
                    // TODO: log req
                    // console.log(req.url, req.method)
                    // console.log(res.data);
                });
            next();
        }
    );
    // --< log file

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