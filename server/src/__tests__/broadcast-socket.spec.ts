/* eslint-disable no-undef */
// Import dependencies
// import express from 'express';
import io from 'socket.io-client';
import server from '../mocks/ioServerMock';

const ioOptions = {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false,
};

// const test = io(http);

describe('socket.io testing', () => {
  let sender: any;
  let receiver: any;

  beforeEach((done) => {
    console.log(server);
    server.start();
    sender = io('http://localhost:5000/', ioOptions);
    receiver = io('http://localhost:5000/', ioOptions);
    done();
  });

  afterEach((done) => {
    sender.disconnect();
    receiver.disconnect();
    done();
  });

  describe('Message Events', () => {
    it('Clients should receive a message when the `message` event is emited.', (done) => {
      sender.emit('message', 'Hello World');
      receiver.on('message', (msg: string) => {
        expect(msg).toBe('Hello World');
        done();
      });
    });
  });
});
