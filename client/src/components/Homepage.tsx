/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import '../styles/style.css';

import BroadcastTile from './Broadcast-tile';
import BroadcastInterface from '../interfaces/Broadcast';

interface Props {
  allBroadcasts: any,
  getAllBroadcasts: any
}

function Homepage({ allBroadcasts, getAllBroadcasts }:Props) {
  // Get list of all broadcasts when homepage is loaded
  useEffect(() => {
    getAllBroadcasts();
  }, []);

  return (
    <div className="homepage">
      {allBroadcasts.map((broadcast: BroadcastInterface) => <BroadcastTile broadcast={broadcast} />)}
    </div>
  );
}

export default Homepage;
