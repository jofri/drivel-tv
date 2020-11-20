// Require mongoose
import mongoose, { Schema } from 'mongoose';

export interface MessageModel {
  sender: string;
  msg: string;
  room: string;
}
// Create new Message schema
const MessageModelSchema = new Schema<MessageModel>({
  sender: { type: String, required: true },
  msg: { type: String, required: true },
  room: { type: String, required: true },
}, { timestamps: true }); // Set automatic timestamp for every document

export default mongoose.model('Message', MessageModelSchema);
