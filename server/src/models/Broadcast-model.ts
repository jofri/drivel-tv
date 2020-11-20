// Require mongoose
import mongoose, { Schema } from 'mongoose';

export interface BroadcastModel {
  broadcastId: string;
  title: string;
  description?: string;
  tags?: string[];
  thumbnailUrl: string;
  owner: string;
  isReversed: boolean;
  youtubePlaylists: string[];
  videoArray: string[];
  currentVideo: any;
  currentVideoLength: string | number;
  currentTime: number;
  nextVideo: any;
  nextVideoLength: string | number;
}
// Create new Broadcast schema
const BroadcastModelSchema = new Schema<BroadcastModel>({
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

export default mongoose.model('Broadcast', BroadcastModelSchema);
