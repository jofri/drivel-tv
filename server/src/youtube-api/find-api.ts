import Video from '../models/Video-model';

// Function that returns video by video ID
const findVideo = async (vidId: []) => Video.find({ youtubeId: vidId });

export default findVideo;
