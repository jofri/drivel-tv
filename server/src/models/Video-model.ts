
// Require mongoose
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Create new Video schema
const VideoModel = new Schema({
  youtubeId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnailUrl: String,
  length: { type: String, required: true },
}, { timestamps: true }); // Set automatic timestamp for every document

module.exports = mongoose.model('Video', VideoModel);
