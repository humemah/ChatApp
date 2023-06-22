import { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ChatBody = ({ messages,socket,onDeleteMessage }) => {
 
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };
  
  const handleDeleteMessage = (id) => {
    socket.emit('delete message', id);
    onDeleteMessage(id); // call the callback function to update the messages state
  };
  console.log('Messages:', messages);
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
              <p className="sender__name">{message.time}</p>
              <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
              <p className="sender__name">{message.time}</p>
            </div>
          )
        )}

        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
        
      </div>
    </>
  );
};

export default ChatBody;