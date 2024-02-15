import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import mergeRoute from './route/merge-route-app';
import connectDB from "./config/connectDB";

require('dotenv').config();

let app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    // res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-request-key');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// set limit file size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

viewEngine(app);

mergeRoute(app)

connectDB();

import { monitorOrder } from "./services/paymentService";

monitorOrder()

// --
let port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log("ThaiVietJet NodeJs is running on port: ", port)
})