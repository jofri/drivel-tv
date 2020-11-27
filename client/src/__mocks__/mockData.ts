import { BroadcastInterface } from '../interfaces/Broadcast';

const broadcastMock: BroadcastInterface = {
  broadcastId: '12376',
  createdAt: 'date',
  currentTime: 12,
  currentVideo: 'test current video',
  currentVideoLength: 'current video length',
  description: 'description',
  isReversed: false,
  nextVideo: 'next video',
  nextVideoLength: 'next video length',
  videoArray: ['array', 'array1'],
  owner: 'test Owner',
  tags: 'test tags',
  thumbnailUrl: 'test thumbnailURL',
  title: 'test Title',
  updatedAt: 'test date',
  // videoArray: string[],
  youtubePlaylists: ['https://www.youtube.com/playlist?list=PLzzTGHx5F0INj7PgsDPsbU2cE_zBMPjT8'],
  __v: 1,
  id: '1',
};

export default broadcastMock;
