"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
// Import dependencies
// import express from 'express';
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const ioServerMock_1 = __importDefault(require("../mocks/ioServerMock"));
const ioOptions = {
    transports: ['websocket'],
    forceNew: true,
    reconnection: false,
};
// const test = io(http);
describe('socket.io testing', () => {
    let sender;
    let receiver;
    beforeEach((done) => {
        console.log(ioServerMock_1.default);
        ioServerMock_1.default.start();
        sender = socket_io_client_1.default('http://localhost:5000/', ioOptions);
        receiver = socket_io_client_1.default('http://localhost:5000/', ioOptions);
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
            receiver.on('message', (msg) => {
                expect(msg).toBe('Hello World');
                done();
            });
        });
    });
});
//# sourceMappingURL=broadcast-socket.spec.js.map