import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';


const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const room = localStorage.getItem('room');
    useEffect(() => {
      socket.on('messageResponse', (message) => {
        console.log('New message:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    
      // Clean up the event listener when the component unmounts
      return () => {
        socket.off('messageResponse');
      };
    }, [socket]);
  
    const handleDeleteMessage = (messageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
    };
  
  
    return (
      <div className="chat">
        <ChatBar />
        <div className="chat__main">
        <ChatBody messages={messages} socket={socket} room={room} onDeleteMessage={handleDeleteMessage} />
        <ChatFooter socket={socket} />
        </div>
      </div>
    );
  };
  
  export default ChatPage;