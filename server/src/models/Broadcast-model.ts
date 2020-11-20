// Require mongoose
import mongoose, { Schema } from 'mongoose';

// Create new Broadcast schema
const BroadcastModelSchema = new Schema({
  broadcastId: { type: String, required: true, unique: true },
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

export interface BroadcastModel {
  broadcastId: string;
  title: string;
  description?: string;
  tags?: string;
  thumbnailUrl: string;
  owner: string;
  isReversed: boolean;
  youtubePlaylists: [];
  videoArray: [];
  currentVideo: string;
  currentVideoLength: string;
  currentTime: number;
  nextVideo: string;
  nextVideoLength: string;
}

export default mongoose.model('Broadcast', BroadcastModelSchema);
