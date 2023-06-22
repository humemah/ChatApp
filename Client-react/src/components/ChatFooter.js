import React, { useState } from 'react';
// import {socket} from "../App.js"

import io from "socket.io-client";
export const socket = io("http://localhost:3000",{ transports: ['polling'] });
const ChatFooter = (room) => {
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
        room:localStorage.getItem('room')
      });
    }
    setMessage('');
  };
  
  

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;