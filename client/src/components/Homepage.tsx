/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import '../styles/style.css';
import { v4 as uuidv4 } from 'uuid';

import BroadcastTile from './Broadcast-tile';
import { BroadcastInterface } from '../interfaces/Broadcast';

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
      {allBroadcasts.map((broadcast: BroadcastInterface) => (
        <React.Fragment key={uuidv4()}>
          <BroadcastTile broadcast={broadcast} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Homepage;
