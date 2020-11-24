/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';

import '../styles/style.css';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import Chat from './Chat';
import Videoplayer from './Videoplayer';

import BroadcastInterface from '../interfaces/Broadcast';
import { Message } from '../interfaces/Message';

let socket: SocketIOClient.Socket;

interface Props {
  broadcast: BroadcastInterface | null,
  getBroadcast: any
}

function Broadcast({ broadcast, getBroadcast } : Props) {
  const [allMessages, setAllMessages] = useState<Message[] | null>(null);
  const [_broadcast, setBroadcast] = useState<BroadcastInterface | null>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    // Connect to room-specific socket and get all chat
    socket = io.connect();
    socket.emit('join', window.location.pathname);

    // Get broadcast object for this room from backend server
    getBroadcast(window.location.pathname.slice(3));

    // Listens for array of previous room messages
    socket.on('all chat messages to client', (messages: Message[]) => {
      setAllMessages(messages);
    });

    // On component unmount, close socket
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Store broadcast object as state when getting response from backend server
    setBroadcast(broadcast);
  }, [broadcast]);

  // Sends new message (from groupchat) to server
  const emitMsg = (_msg: string) => {
    const newMessage = { sender: 'Guest', msg: _msg, room: pathname };
    socket.emit('chat message to server', newMessage);
    setAllMessages((currentState: any) => [...currentState, newMessage]);
  };

  return (
    <div className="broadcast">
      <Videoplayer broadcast={_broadcast} />
      <Chat emitMsg={emitMsg} allMessages={allMessages} />
    </div>
  );
}

export default Broadcast;
