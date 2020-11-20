
// Require mongoose
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Create new Broadcast schema
const BroadcastModel = new Schema({
  broadcastId: { type: String, required: true, unique: true},
  title: { type: String, required: true },
  description: String,
  tags: String,
  thumbnailUrl: { type: String, required: true },
  owner: { type: String, required: true },
  isReversed: { type: Boolean, required: true },
  youtubePlaylists: { type: Array, required: true },
  videoArray: { type: Array, required: true },
  currentVideo: { type: String, required: true },
  currentVideoLength: { type: String, required: true },
  currentTime: { type: Number, required: true },
  nextVideo: { type: String, required: true },
  nextVideoLength: { type: String, required: true },
}, { timestamps: true }); // Set automatic timestamp for every document

module.exports = mongoose.model('Broadcast', BroadcastModel);