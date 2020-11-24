/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';

import '../styles/style.css';
import $ from 'jquery';
import { Message } from '../interfaces/Message';

interface Props {
  allMessages: Message[] | null,
  data: Message | null,
  emitMsg: any
}

function Chat({ allMessages, data, emitMsg }: Props) {
  const [msg, setMsg] = useState<string>('');

  // Appends old messages (from server -> Broadcast component) to list
  useEffect(() => {
    // If messages have been fetched, append each message to chat list
    if (allMessages) {
      allMessages.forEach((message: any) => {
        $('#chatList').append($('<li>').html(`<span class="guest">${message.sender}:</span> ${message.msg}`));
      });
    }
  }, [allMessages]);

  // Appends new messages (from server -> Broadcast component) to list
  useEffect(() => {
    if (data) {
      if (data.sender !== undefined) $('#chatList').append($('<li>').html(`<span class="user">${data.sender}:</span> ${data.msg}`));
    }
  }, [data]);

  return (
    <div className="chat">
      <ul id="chatList" />
      <form
        id="chatForm"
        action=""
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reloading
          if (msg === '') return; // Do not emit message if input is empty
          emitMsg(msg); // Call emit function in Broadcast component
          setMsg(''); // Clear input box
        }}
      >
        <input id="chatInput" autoComplete="off" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button type="submit" id="chatButton">Send</button>
      </form>
    </div>
  );
}

export default Chat;
