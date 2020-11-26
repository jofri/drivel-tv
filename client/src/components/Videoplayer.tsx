/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';

import '../styles/style.css';
import YouTube from 'react-youtube';
import { BroadcastInterface } from '../interfaces/Broadcast';

interface Props {
  broadcast: BroadcastInterface | null
}

interface Options {
  height: string,
  width: string,
  playerVars: any
}

function Videoplayer({ broadcast }: Props) {
  const [_broadcast, setBroadcast] = useState<BroadcastInterface | null>(null);

  // Set broadcast object as state
  useEffect(() => {
    setBroadcast(broadcast);
  }, [broadcast]);

  // Function to reload page / get new video at end of current video
  const reload = (event: any) => {
    if (event.data === 0) window.location.reload();
  };

  // Define YouTube player options and assign start time from state
  const opts: Options = {
    height: '100%',
    width: '100%',
    playerVars: {
      enablejsapi: 1,
      playsinline: 1,
      'webkit-playsinline': 1,
      autoplay: 1,
      start: _broadcast?.currentTime,
    },
  };

  return (
    <YouTube containerClassName="videoplayer" onStateChange={reload} videoId={_broadcast?.currentVideo} opts={opts} />
  );
}

export default Videoplayer;
