/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import io from 'socket.io-client';
import mongoose from 'mongoose';
import MessageModel from '../models/Message-model';
import mocks from '../mocks/mocks';

let socket: any;

describe.only('socket.io testing', () => {
  beforeAll(async (done) => {
    socket = io('http://localhost:4000', { transports: ['websocket'] });
    socket.emit('join', mocks.mockRoom);
    await mongoose.connect('mongodb://localhost:27017/driveltv', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    done();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Client should create message (and store in DB) when the message is emitted', (done) => {
    socket.emit('chat message to server', mocks.mockMessage);
    const msg: any = MessageModel.find({ msg: mocks.mockMessage.msg });
    expect(msg).toBeTruthy;
    done();
  });
});
