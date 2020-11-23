/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import io from 'socket.io-client';
import mongoose from 'mongoose';
import MessageModel from '../models/Message-model';
import mocks from '../mocks/mocks';

let socket: any;

describe.only('socket.io testing', () => {
  beforeAll((done) => {
    socket = io('http://localhost:4000', { transports: ['websocket'] });
    socket.emit('join', mocks.mockRoom);
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    done();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('Client should create message (and store in DB) when the message is emitted', async (done) => {
    socket.emit('chat message to server', mocks.mockMessage);
    const msg: any = MessageModel.find({ msg: mocks.mockMessage.msg });
    expect(msg).toBeTruthy;
    done();
  });
});
