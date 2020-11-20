export default interface BroadcastInterface {
  broadcastId: string,
  createdAt: string,
  currentTime: number,
  currentVideo: string,
  currentVideoLength: string,
  descritpion: string,
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
  id: string
}

export interface BroadcastRaw {
  title: string,
  description: string,
  tags: string,
  owner: string,
  isReversed: boolean | any,
  youtubePlaylists: string
}