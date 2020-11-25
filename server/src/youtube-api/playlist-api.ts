/* eslint-disable no-console */
/* eslint-disable max-len */
// Import fetch and modules to manipulate URLs
import fetch from 'node-fetch';
import url from 'url';
import querystring from 'querystring';
import { nanoid } from 'nanoid';
import storeVideosToDb from './video-api';

export interface BroadcastRaw {
  broadcastId: string;
  thumbnailUrl: string;
  youtubePlaylistIds: string[];
  videoArray: string[];
  currentVideo: string;
  nextVideo: string;
}

// Function that processes playlists using YouTube API
const convertPlaylist = async (isReversed: boolean, youtubePlaylists: string) => {
  try {
    // Variable to save playlist thumbnail url
    let imageUrl: string = 'No thumbnail';

    // Get all YouTube video ids from playlists
    const getVidIds = async (playlists: string[]) => {
      // Return array of video ids from each playlist URL
      const playlistVideoArray: any = await Promise.all(playlists.map(async (playlistUrl) => {
        const parsedUrl = url.parse(playlistUrl);
        // Parse playlist URL to get playlist id
        const parsedQs = querystring.parse(parsedUrl.query || '');
        // Call YouTube API to get all Ids
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+id&playlistId=${parsedQs.list}&key=${process.env.YT_API_KEY}`);
        const youtubeJSON = await response.json();
        const array: string[] = await youtubeJSON.items.map((video: any) => video.snippet.resourceId.videoId);

        // Save first video thumbnail as playlist thumbnail
        // If thumbnail resolution does not exist, use the next available size
        if (youtubeJSON.items[0].snippet.thumbnails.maxres) imageUrl = youtubeJSON.items[0].snippet.thumbnails.maxres.url;
        else if (youtubeJSON.items[0].snippet.thumbnails.standard) imageUrl = youtubeJSON.items[0].snippet.thumbnails.standard.url;
        else if (youtubeJSON.items[0].snippet.thumbnails.high) imageUrl = youtubeJSON.items[0].snippet.thumbnails.high.url;

        // Return array of ids
        return array;
      }));
      // Return array of arrays containing video ids
      return playlistVideoArray.flat();
    };

    // Convert playlist string to array of playlists and remove whitespace
    const escapedyoutubePlaylists = youtubePlaylists.replace(/\s/g, '').split(',');

    // Get video array
    const playlistVideoArray = await getVidIds(escapedyoutubePlaylists);

    // Flatten the array of arrays, generating a complete list of video ids
    const flattenedVideoArray = [].concat(...playlistVideoArray);

    // Return if no videos in array
    if (flattenedVideoArray.length < 2) return;

    // Reverse video-order per user setting
    if (isReversed === true) flattenedVideoArray.reverse();

    // Store all YouTube videos in DB

    await storeVideosToDb(flattenedVideoArray);

    // Crate new unique broadcast id
    const id = nanoid();

    // Save relevant data in broadcast object
    const broadcast: BroadcastRaw = {
      broadcastId: id,
      thumbnailUrl: imageUrl,
      youtubePlaylistIds: escapedyoutubePlaylists,
      videoArray: flattenedVideoArray,
      currentVideo: flattenedVideoArray[0],
      nextVideo: flattenedVideoArray[1],
    };

    // Return broadcast object
    // eslint-disable-next-line consistent-return
    return broadcast;
  } catch (error) {
    console.log('Problem processing playlists using YouTube API', error);
  }
};

export default convertPlaylist;
