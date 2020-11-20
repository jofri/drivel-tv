// Import CRON-like module for broadcast timestamp scheduling
import schedule from 'node-schedule';
// Import moment to decode YouTube timestamp
import * as moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
// Import models
import Broadcast from '../models/Broadcast-model';
import Video from '../models/Video-model';


momentDurationFormatSetup(moment);

// Start timer that updates broadcast every second
const startCron = (broadcastId: string) => {
  // If broadcast id does not exist, start broadcast - else, throw error
  if (!schedule.scheduledJobs[broadcastId]) {
    schedule.scheduleJob(broadcastId, '* * * * * *', () => {
      Broadcast.findOne({ broadcastId }, async (err, broadcast) => {
        if (err) throw new Error(`Could not find broadcast in DB! ${err}`);

        // Convert YouTube timestamp to seconds (and remove commas produced by moment plugin)
        const length = Number(moment.duration(broadcast.currentVideoLength).format('ss').replace(/,/g, ''));

        // If current timestamp is less than video duration, increment with 1 second
        if (broadcast.currentTime < length) {
          // console.log('++', broadcast.broadcastId); // Server-log to verify if broadcast timers are on
          broadcast.currentTime = ++broadcast.currentTime; // Increment timestamp by 1
          broadcast.save(); // Save to DB
        } else {
          // If video has finsihed playing,
          // shift current video to the back of the queue and update video & timestamp data
          const newVideoArray = broadcast.videoArray;
          newVideoArray.push(newVideoArray.shift()); // Shift queue

          // Find video length of next video in queue
          const nextLength = await Video.findOne({ youtubeId: newVideoArray[1] }, (err) => {
            if (err) throw new Error('Could not find next video in DB!', err);
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
      });
    });
  } else {
    throw new Error('Broadcast id already exists');
  }
};

export default startCron;
