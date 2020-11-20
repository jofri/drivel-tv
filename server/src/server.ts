
// Import dependencies
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const router = require('./router');
const mongoose = require('mongoose');
const {startAllCron} = require('./cron/cron-startup');

// Call io module with io instance
require('./socket/broadcast-socket')(io);

// If app is in dev mode, replace process.env variables with variables in .env file
if (process.env.NODE_ENV !== 'production') require('dotenv').config();


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
http.listen(process.env.PORT, async (req, res) => { // eslint-disable-line no-unused-vars
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    // Function that finds all broadcasts in DB and start their timers
    await startAllCron();
    console.log(`Drivel server connected to DB - listening on port: ${process.env.PORT}`);
  } catch (error) {
    console.log('Could not connect to database', error);  // eslint-disable-line no-console
  }
});


