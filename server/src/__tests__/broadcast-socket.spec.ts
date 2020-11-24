/* eslint-disable no-undef */
// Import dependencies
// import express from 'express';
import { Server } from 'socket.io';
import io from 'socket.io-client';
import http from 'http';
import { setTimeout } from 'timers';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env.test'),
});

const ioOptions = {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false,
};

// const test = io(http);

describe('socket.io testing', () => {
  let sender: any;
  let receiver: any;
  let httpServer: any;
  let ioServer: any;

  beforeAll((done) => { // make it async, await for db connection
    httpServer = new http.Server().listen(5000);
    ioServer = new Server(httpServer);
    ioServer.on('connection', (socket: any) => {
      socket.on('message', (data: any) => {
        socket.broadcast.emit('message', data);
      });
      setTimeout(() => {
        socket.emit('push', 'mock content');
      }, 200);
    });
    done();
  });

  beforeEach((done) => {
    sender = io('http://localhost:5000/', ioOptions);
    receiver = io('http://localhost:5000/', ioOptions);
    sender.on('connect', done);
    receiver.on('connect', done);
  });

  afterEach((done) => {
    sender.disconnect();
    receiver.disconnect();
    done();
  });

  afterAll(() => {
    httpServer.close();
    ioServer.close();
  });

  describe('Message Events', () => {
    it('Clients should receive a message when the `message` event is emited.', (done) => {
      sender.emit('message', 'Hello World');
      receiver.on('message', (msg: string) => {
        expect(msg).toBe('Hello World');
        done();
      });
    });
    it('Emit messages from the server', (done) => {
      let count: number = 0;
      receiver.on('push', (msg: string) => {
        expect(msg).toBe('mock content');
        count += 1;
      });
      sender.on('push', (msg: string) => {
        expect(msg).toBe('mock content');
        count += 1;
      });
      setTimeout(() => {
        expect(count).toBe(2);
        done();
      }, 2000);
    });
  });
});
