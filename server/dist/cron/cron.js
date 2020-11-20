var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import CRON-like module for broadcast timestamp scheduling
const schedule = require('node-schedule');
// Import models
const Broadcast = require('../models/Broadcast-model');
const Video = require('../models/Video-model');
// Import moment to decode YouTube timestamp
let moment = require('moment');
let momentDurationFormatSetup = require('moment-duration-format');
momentDurationFormatSetup(moment);
// Start timer that updates broadcast every second
exports.startCron = (broadcastId) => {
    // If broadcast id does not exist, start broadcast - else, throw error
    if (!schedule.scheduledJobs[broadcastId]) {
        schedule.scheduleJob(broadcastId, '* * * * * *', function () {
            Broadcast.findOne({ broadcastId: broadcastId }, (err, broadcast) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    throw new Error('Could not find broadcast in DB!', err);
                // Convert YouTube timestamp to seconds (and remove commas produced by moment plugin)
                const length = Number(moment.duration(broadcast.currentVideoLength).format('ss').replace(/,/g, ''));
                // If current timestamp is less than video duration, increment with 1 second
                if (broadcast.currentTime < length) {
                    //console.log('++', broadcast.broadcastId); // Server-log to verify if broadcast timers are on
                    broadcast.currentTime = ++broadcast.currentTime; // Increment timestamp by 1
                    broadcast.save(); // Save to DB
                }
                else {
                    // If video has finsihed playing,
                    // shift current video to the back of the queue and update video & timestamp data
                    let newVideoArray = broadcast.videoArray;
                    newVideoArray.push(newVideoArray.shift()); // Shift queue
                    // Find video length of next video in queue
                    const nextLength = yield Video.findOne({ youtubeId: newVideoArray[1] }, (err) => {
                        if (err)
                            throw new Error('Could not find next video in DB!', err);
                    });
                    // Update broadcast object
                    broadcast.videoArray = newVideoArray; // Set shifted queue as new array of videos
                    broadcast.currentVideo = newVideoArray[0]; // Set new beginning of queue as first video
                    broadcast.currentVideoLength = broadcast.nextVideoLength; // Set next video's length as current length
                    broadcast.currentTime = 0; // Reset timestamp
                    broadcast.nextVideo = newVideoArray[1]; // Set new next vide
                    broadcast.nextVideoLength = nextLength.length; // Set next video length using value fetched from DB
                    broadcast.save(); // Save to DB
                }
            }));
        });
    }
    else {
        throw new Error('Broadcast id already exists');
    }
};
//# sourceMappingURL=cron.js.map