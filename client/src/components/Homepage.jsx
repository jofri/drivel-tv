
import '../styles/style.css';
import { useEffect } from 'react';
import BroadcastTile from './Broadcast-tile';

function Homepage (props) {

  // Get list of all broadcasts when homepage is loaded
  useEffect( () => {
    props.getAllBroadcasts();
  },[])


  return (
    <div className="homepage">
      {props.allBroadcasts.map(broadcast => <BroadcastTile key={broadcast.broadcastId} broadcast={broadcast} /> )}
    </div>
  )
}

export default Homepage;