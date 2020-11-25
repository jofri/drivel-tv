import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../styles/style.css';
import profile from '../assets/random_guest.png';

function BroadcastTile (props) {

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
      <div onClick={redirect} data-testid='tile-click' className="broadcast-tile">
        <div className="broadcast-thumb" style={{background: `url('${props.broadcast.thumbnailUrl}') center no-repeat `, backgroundSize: 'cover' }}>
        </div>
        <div className="broadcast-details">
          <div className="broadcast-profilepic">
            <img src={profile} alt="" style={{backgroundColor: color}}/>
          </div>
          <div className="broadcast-title-owner">
            <h3 data-testid='title'>{props.broadcast.title}</h3>
            <p data-testid='owner'>{props.broadcast.owner}</p>
          </div>
        </div>
      </div>
  )
}

export default BroadcastTile;

