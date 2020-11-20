import React from 'react'
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../styles/style.css';
import BroadcastInterface from '../interfaces/Broadcast';
// import profile from '../assets/random_guest.png';

interface Props {
  broadcast: BroadcastInterface
}

function BroadcastTile (props: Props) {

  // Import useHistory for redirect functionality
  const history = useHistory();

  // Stores a random color for user image backgrounds
  const [ color, setColor ] = useState('');

  useEffect( () => {
    // Generates random color from array
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#FF5733', '#2EEFFF', '#FFB32E'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);


  const redirect = () => {
    history.push(`/b/${props.broadcast.broadcastId}`);
  };



  return (
      <div onClick={redirect} className="broadcast-tile">
        <div className="broadcast-thumb" style={{background: `url('${props.broadcast.thumbnailUrl}') center no-repeat `, backgroundSize: 'cover' }}>
        </div>
        <div className="broadcast-details">
          <div className="broadcast-profilepic">
            {/* fix next line to src=profile */}
            <img alt="" style={{backgroundColor: color}}/> 
          </div>
          <div className="broadcast-title-owner">
            <h3>{props.broadcast.title}</h3>
            <p>{props.broadcast.owner}</p>
          </div>
        </div>
      </div>
  )
}

export default BroadcastTile;

