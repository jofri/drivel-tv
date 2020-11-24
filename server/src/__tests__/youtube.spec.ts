/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import convertPlaylist from '../youtube-api/playlist-api';
import mocks from '../mocks/mocks';
import storeVideosToDb from '../youtube-api/video-api';

describe('YouTube functions', () => {
  it('should convert a playlist into a broadcast', async () => {
    const outcome = await convertPlaylist(false, mocks.mockUser1.youtubePlaylists);
    expect(outcome).toBeTruthy;
  });

  it('should store a video in the database, if it does not exist', async () => {
    const mockArray: string[] = ['d36pOT8NaUA', 'PIHN5pp-mUg'];
    const outcome = await storeVideosToDb(mockArray);
    expect(outcome).toBeTruthy;
  });

  it('should return false if video is invalid', async () => {
    const mockArray: string = 'not an array of strings';
    const outcome = await storeVideosToDb(mockArray);
    expect(outcome).toBe(false);
  });
});
