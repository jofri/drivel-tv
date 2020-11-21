import mongoose from 'mongoose';
import request from 'supertest';
import path from 'path';
import mocks from './mocks';

import expressServer from '../server';

describe('Broadcast endpoints', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should successfully grab all broadcasts', async () => {
    const postBroadcast = await request(expressServer)
      .post('/api/create-broadcast')
      .set('Content-Type', 'application/json')
      .send(mocks.mockUser1)
      .expect(200)

    const allBroadcasts = await request(expressServer)
      .get('/api/get-all-broadcasts')
      .expect(200)
  }, 30000);

  // it ('should return 404 if broadcasts is null', async() => {
  //   const allBroadcasts = await request(expressServer)
  //     .get('/api/get-all-broadcasts')
  //     .expect(404)
  // })

  // it('should successfuly grab a single broadcast', async () => {
  //   const oneBroadcast = await request(expressServer)
  //     .get('/api/get-broadcast')
  //   expect(oneBroadcast.status).toBe(200);
  // });

  
})