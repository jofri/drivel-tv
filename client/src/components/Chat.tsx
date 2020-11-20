import React from 'react'
import { useState, useEffect } from 'react';
import '../styles/style.css';
import $ from 'jquery';

interface Props {
  allMessages: string[],
  data: any,
  emitMsg: any
}

function Chat (props: Props) {

  const [msg, setMsg] = useState('');

   // Appends old messages (from server -> Broadcast component) to list
   useEffect(() => {
    // If messages have been fetched, append each message to chat list
    if (props.allMessages) {
      props.allMessages.forEach((message: any) => {
        $('#chatList').append($('<li>').html(`<span class="guest">${message.sender}:</span> ${message.msg}`));
      });
    }
  }, [props.allMessages]);

  // Appends new messages (from server -> Broadcast component) to list
  useEffect(() => {
    if (props.data.sender !== undefined) $('#chatList').append($('<li>').html(`<span class="user">${props.data.sender}:</span> ${props.data.msg}`));
  }, [props.data]);




  return (
    <div className="chat">
      <ul id="chatList"></ul>
      <form id="chatForm" action="" onSubmit={ (e) => {
        e.preventDefault(); // Prevent page reloading
        if(msg === '') return; // Do not emit message if input is empty
        props.emitMsg(msg); // Call emit function in Broadcast component
        setMsg(''); // Clear input box
      }}>
        <input id="chatInput" autoComplete="off" value={msg} onChange={ (e) => setMsg(e.target.value)}/>
        <button id="chatButton">Send</button>
      </form>
    </div>
  )
}

export default Chat;