
import { useState, useEffect } from 'react';
import '../styles/style.css';
import $ from 'jquery';


function Chat (props) {

  const [msg, setMsg] = useState('');

   // Appends old messages (from server -> Broadcast component) to list
   useEffect(() => {
    // If messages have been fetched, append each message to chat list
    if (props.allMessages) {
      props.allMessages.forEach(message => {
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
        const chatBox = $('#chatList');
        setTimeout( () => chatBox.scrollTop(chatBox[0].scrollHeight), 50); // Once message is emitted back to own chat, scroll chat to last message
        props.emitMsg(msg); // Call emit function in Broadcast component
        setMsg(''); // Clear input box
      }}>
        <input id="chatInput" autocomplete="off" value={msg} onChange={ (e) => setMsg(e.target.value)}/>
        <button id="chatButton">Send</button>
      </form>
    </div>
  )
}

export default Chat;