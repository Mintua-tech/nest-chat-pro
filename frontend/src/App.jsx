import React, { useState } from 'react';
import Chat from './components/Chat';

export default function App() {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('general');

  if (!joined) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Join Chat</h2>
        <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="room" value={room} onChange={e => setRoom(e.target.value)} />
        <button onClick={() => setJoined(true)} disabled={!username}>Join</button>
      </div>
    );
  }

  return <Chat username={username} room={room} />;
}
