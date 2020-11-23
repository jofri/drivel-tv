const express = require('express');

const app = express();
const port = 5000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket: any) => {
  socket.on('message', (msg: string) => {
    io.sockets.emit('message', msg);
  });
});

// export the server so it can be easily called for testing
const server = http.listen(port);

export default server;
