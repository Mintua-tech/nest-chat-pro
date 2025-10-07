import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export default function Chat({ username, room }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    // connect to backend (nginx or docker-compose will reverse proxy)
    // const URL = `${window.location.protocol}//${window.location.hostname}:80`; // served via nginx on port 80
    // const socket = io(URL, { transports: ['websocket', 'polling'] });
    
     const socket = io('/', {
        path: '/socket.io/',
        transports: ['websocket', 'polling'],
      });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('connected', socket.id);
      socket.emit('joinRoom', { username, room });
    });

    socket.on('roomMessages', (msgs) => {
      setMessages(msgs);
    });

    socket.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('userJoined', (payload) => {
      setMessages(prev => [...prev, { text: `${payload.user} joined` }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [username, room]);

  const send = () => {
    if (!text) return;
    socketRef.current.emit('message', { text });
    setText('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Room: {room}</h3>
      <div style={{ height: 300, overflow: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((m, idx) => (
          <div key={idx}><strong>{m.user?.username ?? ''}</strong>: {m.text}</div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} />
      <button onClick={send}>Send</button>
    </div>
  );
}
