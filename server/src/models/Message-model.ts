
// Require mongoose
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Create new Message schema
const MessageModel = new Schema({
  sender: { type: String, required: true },
  msg: { type: String, required: true },
  room: { type: String, required: true },
}, { timestamps: true }); // Set automatic timestamp for every document

module.exports = mongoose.model('Message', MessageModel);
