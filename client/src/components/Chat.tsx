/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';

import '../styles/style.css';
import { Message } from '../interfaces/Message';

interface Props {
  allMessages: Message[] | null,
  emitMsg: any
}

function Chat({ allMessages, emitMsg }: Props) {
  const [msg, setMsg] = useState<string>('');

  return (
    <div className="chat">
      <ul id="chatList" />
      <ul id="chatList">
        {allMessages?.map((message) => (
          <li>
            <span className="user">
              {message.sender}
              :
              {' '}
              {' '}
            </span>
            {message.msg}
          </li>
        ))}
      </ul>
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
