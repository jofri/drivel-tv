

const {startCron} = require('../cron/cron');
const Broadcast = require('../models/Broadcast-model');

// Function that finds all broadcasts and start their timers
exports.startAllCron = async () => {

  // Find all broadcasts in DB using Mongoose
  await Broadcast.find({}, (err, broadcasts) => {

    // For each broadcast, start a corresponding timer
    broadcasts.forEach( (broadcast) => {
      startCron(broadcast.broadcastId);
    });

  });

};