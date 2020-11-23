"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
// Import dependencies
// import express from 'express';
const socket_io_1 = __importDefault(require("socket.io"));
const app = require('express')();
const http = require('http').createServer(app);
const test = socket_io_1.default(http);
let socket;
afterAll((done) => {
    socket_io_1.default.close();
    done();
});
beforeEach((done) => {
    console.log(socket_io_1.default);
    socket_io_1.default.on('connection', (test) => {
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
        socket_io_1.default.emit('echo', 'Hello World');
        socket.once('echo', (message) => {
            expect(message).toBe('Hello World');
            done();
        });
    });
});
//# sourceMappingURL=broadcast-socket.spec.js.map