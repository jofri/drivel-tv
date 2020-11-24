import Video, { VideoModel } from '../models/Video-model';

// Function that returns video by video ID
const findVideo = async (videoid: string): Promise<VideoModel|null> => {
  const video = await Video.findOne({ youtubeId: videoid });
  return video?.toObject();
};

export default findVideo;
