import { PlantRoutes } from "./routes/plant.routes";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use('/', PlantRoutes.routes());

export default app;
module.exports = app;