import React from 'react'

import { useState, useEffect } from 'react';
import '../styles/style.css';
import Chat from './Chat';
import Videoplayer from './Videoplayer';
import io from 'socket.io-client';

let socket: any;


function Broadcast (props: any) {

  const [msg, setMsg] = useState('');
  const [allMessages, setAllMessages] = useState('');
  const [broadcast, setBroadcast] = useState({});

  // useEffect ( () => {
  //   //Connect to room-specific socket and get all chat
  //   socket = io.connect();
  //   socket.emit('join', window.location.pathname);

  //   //Get broadcast object for this room from backend server
  //   props.getBroadcast(window.location.pathname.slice(3));

  //    // Listens for array of previouse room messages
  //    socket.on('all chat messages to client', (messages: any) => {
  //     setAllMessages(messages);
  //   });

  //   // Listens for new chat messages from server
  //   socket.on('chat message to client', (data: any) => {
  //     setMsg(data);
  //   });

  //   // On component unmount, close socket
  //   return () => {
  //     socket.close();
  //   }
  // }, []);


  useEffect ( () => {
    // Store broadcast object as state when getting response from backend server
    setBroadcast(props.broadcast);
  }, [props.broadcast]);


  // Sends new message (from groupchat) to server
  const emitMsg = (msg: any) => {
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