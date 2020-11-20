var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import fetch and modules to manipulate URLs
const fetch = require('node-fetch');
const url = require('url');
const querystring = require('querystring');
const { nanoid } = require('nanoid');
const { storeVideosToDb } = require('../youtube-api/video-api');
// Function that processes playlists using YouTube API
exports.convertPlaylist = (isReversed, youtubePlaylists) => __awaiter(this, void 0, void 0, function* () {
    // Variable to save playlist thumbnail url
    let imageUrl;
    // Get all YouTube video ids from playlists
    const getVidIds = (playlists) => __awaiter(this, void 0, void 0, function* () {
        // Return array of video ids from each playlist URL
        const playlistVideoArray = yield Promise.all(playlists.map((playlistUrl) => __awaiter(this, void 0, void 0, function* () {
            let parsedUrl = url.parse(playlistUrl);
            let parsedQs = querystring.parse(parsedUrl.query); // Parse playlist URL to get playlist id
            // Call YouTube API to get all Ids
            const response = yield fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+id&playlistId=' + parsedQs.list + '&key=' + process.env.YT_API_KEY);
            const youtubeJSON = yield response.json();
            const array = yield youtubeJSON.items.map(video => {
                return video.snippet.resourceId.videoId;
            });
            // Save first video thumbnail as playlist thumbnail
            // If thumnail resolution does not exist, use the next avalible size
            if (youtubeJSON.items[0].snippet.thumbnails.maxres)
                imageUrl = youtubeJSON.items[0].snippet.thumbnails.maxres.url;
            else if (youtubeJSON.items[0].snippet.thumbnails.standard)
                imageUrl = youtubeJSON.items[0].snippet.thumbnails.standard.url;
            else if (youtubeJSON.items[0].snippet.thumbnails.high)
                imageUrl = youtubeJSON.items[0].snippet.thumbnails.high.url;
            else
                imageUrl = 'No thumbnail';
            // Return array of ids
            return array;
        })));
        // Return array of arrays coontaining video ids
        return playlistVideoArray;
    });
    // Convert playlist string to array of playlists and remove whitespaces
    let escapedyoutubePlaylists = youtubePlaylists.replace(/\s/g, '').split(',');
    // Get video array
    let playlistVideoArray = yield getVidIds(escapedyoutubePlaylists);
    // Flatten the array of arrays, generating a complete list of video ids
    const flattenedVideoArray = [].concat(...playlistVideoArray);
    // Return if no videos in array
    if (flattenedVideoArray.length < 2)
        return;
    // Reverse video-order per user setting
    if (isReversed === true)
        flattenedVideoArray.reverse();
    // Store all YouTube videos in DB
    yield storeVideosToDb(flattenedVideoArray);
    // Crate new unique broadcast id
    const id = nanoid();
    // Save relevant data in broadcast object
    const broadcast = {
        broadcastId: id,
        thumbnailUrl: imageUrl,
        youtubePlaylistIds: escapedyoutubePlaylists,
        videoArray: flattenedVideoArray,
        currentVideo: flattenedVideoArray[0],
        nextVideo: flattenedVideoArray[1],
    };
    // Return broadcast object
    return broadcast;
});
//# sourceMappingURL=playlist-api.js.map