import mongoose from 'mongoose';
import convertPlaylist from '../youtube-api/playlist-api';
import request from 'supertest';
import mocks from '../mocks/mocks';
import storeVideosToDb from '../youtube-api/video-api';

describe ('YouTube functions', () => {
  it ('should convert a playlist into a broadcast', async () => {
    const outcome = await convertPlaylist(false, mocks.mockUser1.youtubePlaylists);
    expect(outcome).toBeTruthy
  })

  it ('should store a video in the database, if it does not exist', async () => {
    let mockArray: any = [ 'd36pOT8NaUA', 'PIHN5pp-mUg' ];
    const outcome = await storeVideosToDb(mockArray);
    expect(outcome).toBeTruthy;
  })
})