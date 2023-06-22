
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
 const socket = io("http://localhost:3000",{ transports: ['polling'] });
const ChatBar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('update users', (data) => setUsers(data));
  }, [socket]);
  console.log("users",users)
  return (
    <div className="chat__sidebar">
      <h2 >Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default ChatBar;