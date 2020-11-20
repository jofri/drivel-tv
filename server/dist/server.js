var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import dependencies
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const router = require('./router');
const mongoose = require('mongoose');
const { startAllCron } = require('./cron/cron-startup');
// Call io module with io instance
require('./socket/broadcast-socket')(io);
// If app is in dev mode, replace process.env variables with variables in .env file
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
// Parse API requests as JSON
app.use(express.json());
// For api requests, rout them through router file
app.use(router);
// Serve static files (index.html) from from build folder
app.use(express.static(path.join(__dirname, 'client/build')));
// Leverage React routing, return requests to React
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// Connect to MongoDB and listen for new requests
http.listen(process.env.PORT, (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        // Function that finds all broadcasts in DB and start their timers
        yield startAllCron();
        console.log(`Drivel server connected to DB - listening on port: ${process.env.PORT}`);
    }
    catch (error) {
        console.log('Could not connect to database', error); // eslint-disable-line no-console
    }
}));
//# sourceMappingURL=server.js.map