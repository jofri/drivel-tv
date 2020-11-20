import startCron from './cron/cron';
import Broadcast, { BroadcastModel } from '../models/Broadcast-model';

// Function that finds all broadcasts and start their timers
const startAllCron = async () => {
  // Find all broadcasts in DB using Mongoose
  await Broadcast.find({}, (err, broadcasts: BroadcastModel[]) => {
    // For each broadcast, start a corresponding timer
    broadcasts.forEach((broadcast) => {
      startCron(broadcast.broadcastId);
    });
  });
};

export default startAllCron;
