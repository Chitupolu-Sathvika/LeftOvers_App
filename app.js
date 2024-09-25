"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_route_1 = __importDefault(require("./routes/index.route"));
const twilio_service_1 = __importDefault(require("./services/twilio.service"));
const db_1 = require("./db");
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = parseInt(process.env.PORT || '5000');
(0, db_1.initMongoDb)()
    .then(() => {
    console.log('Connected to Db!');
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/api/', index_route_1.default);
    twilio_service_1.default.initTwilio();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
})
    .catch((e) => console.error(e));
