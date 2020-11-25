
import { useState, useEffect, useRef } from 'react';
import '../styles/style.css';
import $ from 'jquery';


function Chat (props) {

  const [msg, setMsg] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
     messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
  };

  useEffect(()=> {
    scrollToBottom()
  }, [msg]);

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


//TODO: need to redesign this component so that the chatList doesnt push the input when it grows

  return (
      <div className="chat">
        <div className="chatListWrapper">
          <ul id="chatList"></ul>
          <div id="anchor" data-testid='scroll' ref={messagesEndRef} />
        </div>
        <form id="chatForm" action="" data-testid='form' onSubmit={ (e) => {
          e.preventDefault(); // Prevent page reloading
          if(msg === '') return; // Do not emit message if input is empty
          props.emitMsg(msg); // Call emit function in Broadcast component
          setMsg(''); // Clear input box
        }}>
          <div className="chatInputWrapper">
            <input id="chatInput" data-testid='input' autoComplete="off" value={msg} onChange={ (e) => setMsg(e.target.value)}/>
            <button id="chatButton" data-testid='send'>Send</button>
          </div>
        </form>
      </div>
  )
}

export default Chat;