import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    socket.emit('adduser', { username: userName, room: room });
    if (room !== "") {
      joinRoom();
      navigate('/chat');
    } else {
      alert('Please enter a room ID');
    }
  };

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room, () => {
        localStorage.setItem('room', room);
      });
    }
  }

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label htmlFor="room">Room ID</label>
      <input
        type="text"
        name="room"
        id="room"
        className="room__input"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button className="home__cta" type="submit">SIGN IN</button>
    </form>
  );
};

export default Home;
