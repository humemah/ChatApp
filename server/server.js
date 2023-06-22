const express = require('express');
// const http = require('http');
const socketIo = require('socket.io');

const app = express();
var server = app.listen(3000);
const cors = require("cors");

app.use(cors());
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
   }
});


// lsit of users
const users = {};
const messages = [];
console.log(messages)


io.on('connection', (socket) => {
  console.log('A user connected');
 
  
  const getUsersInRoom = (room) => {
    const usersInRoom = [];
  
    Object.entries(users).forEach(([socketId, username]) => {
      if (socket.adapter.rooms.get(room)?.has(socketId)) {
        usersInRoom.push(username);
      }
    });
  
    return usersInRoom;
  };
  // Add the user to the list of connected users
  socket.on('adduser', ({ username, room }) => {
    socket.username = username;
    socket.room = room;
    socket.join(room);
    console.log(`${username} connected to room ${room}`);
    users[socket.id] = username;
    io.to(room).emit('updateUsers', getUsersInRoom(room));
  });
 

  // Remove the user from the list of connected users
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    delete users[socket.id];
    io.emit('update users', Object.values(users)); // emit event to update client-side list of active users
  });

  // Listen for chat messages and broadcast them to all connected clients
  socket.on('message', (message) => {
    messages.push(message);
    io.to(message.room).emit('messageResponse', message);
    console.log(`${message.name} posted a message to room ${message.room}:  ${JSON.stringify(message)}`);
    console.log(message)
  });


  
 // Listen for delete message event and broadcast to all connected clients
 socket.on('delete message', (messageId) => {
  const messageIndex = messages.findIndex((m) => m.id === messageId);
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    io.emit('messageDeleted', messageId);
    console.log("msg deleted")
  }
});
});
