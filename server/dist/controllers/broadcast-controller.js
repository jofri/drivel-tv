var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import models
const Broadcast = require('../models/Broadcast-model');
// Import functions that uses YouTube API to get relevant data
const { convertPlaylist } = require('../youtube-api/playlist-api');
const { findVideo } = require('../youtube-api/find-api');
// Import CRON script
const { startCron } = require('../cron/cron');
// Import CRON-like module for broadcast timestamp scheduling
const schedule = require('node-schedule');
// Get all broadcast objects
exports.getAllBroadcast = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Find all broadcast objects and send back to client
    Broadcast.find({}, (err, broadcasts) => {
        if (broadcasts === null)
            res.status(404).send('404'); // If not found, send 404
        else
            res.status(200).json(broadcasts); // Else if found, send broadcast obj back
    });
});
// Get broadcast object
exports.getBroadcast = (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Get broadcast id from request
    const broadId = req.body.broadcastId;
    // Find specific broadcast object and send back to client
    Broadcast.findOne({ broadcastId: broadId }, (err, broadcast) => {
        if (broadcast === null)
            res.status(404).send('404'); // If not found, send 404
        else
            res.status(200).json(broadcast); // Else if found, send broadcast obj back
    });
});
// Create broadcast function
exports.createBroadcast = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Destruct client request data
        const { title, description, tags, owner, isReversed, youtubePlaylists } = req.body;
        // Run client data through our YouTube API helper function and return relevant data
        const { broadcastId, thumbnailUrl, youtubePlaylistIds, videoArray, currentVideo, nextVideo } = yield convertPlaylist(isReversed, youtubePlaylists);
        // Return full video object from DB to access length property (video duration - see Broadcast.create below)
        const currentVid = yield findVideo(currentVideo);
        const nextVid = yield findVideo(nextVideo);
        //Store broadcast data in object
        const broadcastObj = {
            broadcastId: broadcastId,
            title: title,
            description: description,
            tags: tags,
            thumbnailUrl: thumbnailUrl,
            owner: owner,
            isReversed: isReversed,
            youtubePlaylists: youtubePlaylistIds,
            videoArray: videoArray,
            currentVideo: currentVideo,
            currentVideoLength: currentVid[0].length,
            currentTime: 0,
            nextVideo: nextVideo,
            nextVideoLength: nextVid[0].length
        };
        //Store broadcast in DB using Mongoose
        yield Broadcast.create(broadcastObj);
        // Start CRON timer (update broadcast every second)
        startCron(broadcastId);
        // Send broadcast back to client
        res.status(200).json(broadcastObj);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
// Delete broadcast function
exports.deleteBroadcast = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Delete broadcast from DB using Mongoose
        yield Broadcast.deleteOne({ broadcastId: req.body.broadcastId });
        const broadcastId = req.body.broadcastId; // TO DO - CHANGE TO URL PARAMETER - Get broadcast id from client
        // If broadcast id exists, delete broadcast - else, throw error
        if (schedule.scheduledJobs[broadcastId]) {
            let currentBroadcast = schedule.scheduledJobs[broadcastId];
            currentBroadcast.cancel();
            res.status(200).send(broadcastId);
        }
        else {
            throw new Error('Broadcast id does not exist');
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
//# sourceMappingURL=broadcast-controller.js.map