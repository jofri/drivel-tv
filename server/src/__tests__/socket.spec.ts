/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import io from 'socket.io-client';
import MessageModel from '../models/Message-model';
import mocks from '../mocks/mocks';

let socket: any;

describe.only('socket.io testing', () => {
  beforeAll((done) => {
    socket = io('http://localhost:4000', { transports: ['websocket'] });
    socket.emit('join', mocks.mockRoom);
    done();
  });

  it('Client should create message when the message is emitted', async (done) => {
    socket.emit('chat message to server', mocks.mockMessage);
    const msg: any = MessageModel.find({ msg: mocks.mockMessage.msg });
    console.log(msg);
    expect(msg).toBeTruthy;
    done();
  });
});
