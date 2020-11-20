// Require mongoose
import mongoose, { Schema } from 'mongoose';

// Create new Video schema
const VideoModelSchema = new Schema({
  youtubeId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnailUrl: String,
  length: { type: String, required: true },
}, { timestamps: true }); // Set automatic timestamp for every document

export interface VideoModel {
  youtubeId: string;
  title: string;
  thumbnailUrl?: string;
  length: string;

  
}

export default mongoose.model('Video', VideoModelSchema);
