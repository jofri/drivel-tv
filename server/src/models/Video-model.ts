// Require mongoose
import mongoose, { Schema } from 'mongoose';

export interface VideoModel {
  youtubeId: string;
  title: string;
  thumbnailUrl?: string;
  length: string;
}
// Create new Video schema
const VideoModelSchema = new Schema<VideoModel>({
  youtubeId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnailUrl: String,
  length: { type: String, required: true },
}, { timestamps: true }); // Set automatic timestamp for every document

export default mongoose.model('Video', VideoModelSchema);
