/* eslint-disable no-undef */
// Import dependencies
// import express from 'express';
import io from 'socket.io';

const app = require('express')();
const http = require('http').createServer(app);

const test = io(http);

let socket: any;

afterAll((done) => {
  io.close();
  done();
});

beforeEach((done) => {
  console.log(io);
  io.on('connection', (test: any) => {
    socket = test;
  });
  socket.on('connect', () => {
    done();
  });
});

afterEach((done) => {
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

describe('socket.io testing', () => {
  test('should communicate', (done) => {
    io.emit('echo', 'Hello World');
    socket.once('echo', (message: string) => {
      expect(message).toBe('Hello World');
      done();
    });
  });
});
