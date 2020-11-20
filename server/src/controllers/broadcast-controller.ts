// Import CRON-like module for broadcast timestamp scheduling
import schedule from 'node-schedule';
// Import models
import Broadcast, { BroadcastModel } from '../models/Broadcast-model';
// Import functions that uses YouTube API to get relevant data
import convertPlaylist from '../youtube-api/playlist-api';
import findVideo from '../youtube-api/find-api';
// Import CRON script
import startCron from '../cron/cron';

// Get all broadcast objects
const getAllBroadcast = async (req: Request, res: Response) => {
  // Find all broadcast objects and send back to client
  Broadcast.find({}, (err: Error, broadcasts: BroadcastModel[]) => {
    if (broadcasts === null) res.status(404).send('404'); // If not found, send 404
    else res.status(200).json(broadcasts); // Else if found, send broadcast obj back
  });
};

// Get broadcast object
const getBroadcast = async (req: Request, res: Response) => {
  // Get broadcast id from request
  const broadId = req.body.broadcastId;

  // Find specific broadcast object and send back to client
  Broadcast.findOne({ broadcastId: broadId }, (err, broadcast) => {
    if (broadcast === null) res.status(404).send('404'); // If not found, send 404
    else res.status(200).json(broadcast); // Else if found, send broadcast obj back
  });
};

// Create broadcast function
exports.createBroadcast = async (req, res) => {
  try {
    // Destruct client request data
    const {
      title, description, tags, owner, isReversed, youtubePlaylists,
    } = req.body;
    // Run client data through our YouTube API helper function and return relevant data
    const {
      broadcastId, thumbnailUrl, youtubePlaylistIds, videoArray, currentVideo, nextVideo,
    } = await convertPlaylist(isReversed, youtubePlaylists);

    // Return full video object from DB to access length property (video duration - see Broadcast.create below)
    const currentVid = await findVideo(currentVideo);
    const nextVid = await findVideo(nextVideo);

    // Store broadcast data in object
    const broadcastObj = {
      broadcastId,
      title,
      description,
      tags,
      thumbnailUrl,
      owner,
      isReversed,
      youtubePlaylists: youtubePlaylistIds,
      videoArray,
      currentVideo,
      currentVideoLength: currentVid[0].length,
      currentTime: 0,
      nextVideo,
      nextVideoLength: nextVid[0].length,
    };

    // Store broadcast in DB using Mongoose
    await Broadcast.create(broadcastObj);

    // Start CRON timer (update broadcast every second)
    startCron(broadcastId);

    // Send broadcast back to client
    res.status(200).json(broadcastObj);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

// Delete broadcast function
exports.deleteBroadcast = async (req, res) => {
  try {
    // Delete broadcast from DB using Mongoose
    await Broadcast.deleteOne({ broadcastId: req.body.broadcastId });

    const { broadcastId } = req.body; // TO DO - CHANGE TO URL PARAMETER - Get broadcast id from client
    // If broadcast id exists, delete broadcast - else, throw error
    if (schedule.scheduledJobs[broadcastId]) {
      const currentBroadcast = schedule.scheduledJobs[broadcastId];
      currentBroadcast.cancel();
      res.status(200).send(broadcastId);
    } else {
      throw new Error('Broadcast id does not exist');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export default {
  getAllBroadcast,
  getBroadcast,
};
