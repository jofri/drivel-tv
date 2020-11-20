var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import models
const Message = require('../models/Message-model');
module.exports = (io) => {
    //When a user connects to a broadcast room
    io.on('connection', (socket) => {
        //console.log('a user connected');
        //Join room
        socket.on('join', (room) => __awaiter(this, void 0, void 0, function* () {
            socket.join(room);
            console.log(socket.id, 'joined', room);
            // Get all chat messages from specific room
            const messages = yield Message.find({ room: room });
            // Send all messages to the user who requested them
            socket.emit('all chat messages to client', messages);
        }));
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
//# sourceMappingURL=broadcast-socket.js.map