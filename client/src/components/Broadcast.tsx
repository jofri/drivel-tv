import React from 'react'

import { useState, useEffect } from 'react';
import '../styles/style.css';
import Chat from './Chat';
import Videoplayer from './Videoplayer';
import * as io from 'socket.io-client';
import BroadcastInterface from '../interfaces/Broadcast';
import { Message } from '../interfaces/Message';

interface Props {
  broadcast: BroadcastInterface | null,
  getBroadcast: any
}

function Broadcast (props: Props) {
  
  const [msg, setMsg] = useState<Message | null>(null);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [broadcast, setBroadcast] = useState<BroadcastInterface | null>(null);

  let socket: SocketIOClient.Socket;

  useEffect ( () => {
    //Connect to room-specific socket and get all chat
    socket = io.connect();
    socket.emit('join', window.location.pathname);

    //Get broadcast object for this room from backend server
    props.getBroadcast(window.location.pathname.slice(3));

     // Listens for array of previouse room messages
     socket.on('all chat messages to client', (messages: Message[]) => {
      setAllMessages(messages);
    });

    // Listens for new chat messages from server
    socket.on('chat message to client', (data: any) => {
      setMsg(data);
    });

    // On component unmount, close socket
    return () => {
      socket.close();
    }
  }, []);


  useEffect ( () => {
    // Store broadcast object as state when getting response from backend server
    if (props.broadcast) {
      setBroadcast(props.broadcast);
    }
  }, [props.broadcast]);


  // Sends new message (from groupchat) to server
  const emitMsg = (msg: string) => {
    socket.emit('chat message to server', { sender: 'Guest', msg: msg, room: window.location.pathname});
  };

  return (
    <div className="broadcast">
      <Videoplayer broadcast={broadcast}/>
      <Chat emitMsg={emitMsg} data={msg} allMessages={allMessages}/>
    </div>
  )
}

export default Broadcast;