
const Video = require('../models/Video-model');

// Function that returns video by video ID
exports.findVideo = async (vidId) => {
  return Video.find({ youtubeId: vidId });
};