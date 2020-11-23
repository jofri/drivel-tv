"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 5000;
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.sockets.emit('message', msg);
    });
});
// export the server so it can be easily called for testing
const server = http.listen(port);
exports.default = server;
//# sourceMappingURL=ioServerMock.js.map