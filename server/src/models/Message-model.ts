
// Require mongoose
import mongoose, { Schema } from 'mongoose';

// Create new Message schema
const MessageModelSchema = new Schema({
  sender: { type: String, required: true },
  msg: { type: String, required: true },
  room: { type: String, required: true },
}, { timestamps: true }); // Set automatic timestamp for every document

export interface MessageModel {
  sender: string;
  msg: string;
  room: string;
}

export default mongoose.model('Message', MessageModelSchema);
