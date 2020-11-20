import Video from '../models/Video-model';

// Function that returns video by video ID
const findVideo = async (vidId: number) => Video.find({ youtubeId: vidId });

export default findVideo;
