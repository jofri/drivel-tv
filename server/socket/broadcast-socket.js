
// Import models
const Message = require('../models/Message-model');

module.exports = (io) => {

  //When a user connects to a broadcast room
  io.on('connection', (socket) => { // eslint-disable-line no-unused-vars
    //console.log('a user connected');

    //Join room
    socket.on('join', async (room) => {
      socket.join(room);
      console.log(socket.id, 'joined', room);

      // Get all chat messages from specific room
      const messages = await Message.find({room: room});
      // Send all messages to the user who requested them
      socket.emit('all chat messages to client', messages);
    });



    //Send all chat messages back to all users in room and store in DB
    socket.on('chat message to server', (data) => {
      // Send message back to all clients in room
      io.to(data.room).emit('chat message to client', data);
      //Store broadcast data in object
      const messageObj = {
        sender: data.sender,
        msg: data.msg,
        room: data.room,
      };
      // Save message to DB using Mongoose
      Message.create(messageObj);
    });

    socket.on('disconnect', () => {
      //console.log('a user disconnected');
    });

  });

};