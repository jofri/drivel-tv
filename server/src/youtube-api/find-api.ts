import Video from '../models/Video-model';

// Function that returns video by video ID
const findVideo = async (vidId: any) => {
  const video = await Video.find({ youtubeId: vidId });
  if (!video) return false;
  return video;
};

export default findVideo;
