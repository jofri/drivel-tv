export default interface BroadcastInterface {
  broadcastId: string,
  createdAt: string,
  currentTime: number,
  currentVideo: string,
  currentVideoLength: string,
  description: string,
  isReversed: boolean,
  nextVideo: string,
  nextVideoLength: string,
  owner: string,
  tags: string,
  thumbnailUrl: string,
  title: string,
  updatedAt: string,
  videoArray: string[],
  youtubePlaylists: string[],
  __v: number,
  id: string,
// eslint-disable-next-line semi
}

export interface BroadcastRaw {
  title: string,
  description: string,
  tags: string,
  owner: string,
  isReversed: boolean | any,
  youtubePlaylists: string,
}
