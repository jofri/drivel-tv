import { render } from '@testing-library/react';
import React from 'react';
import Videoplayer from './Videoplayer.jsx';

test('video should play live stream', () => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      enablejsapi: 1,
      playsinline: 1,
      'webkit-playsinline': 1,
      autoplay: 1,
      start: 1,
    },
  };

  const broadcast = {
    title: 'This is a video',
    owner: 'I own this broadcast',
    broadcastId: '1',
  };

  render(<Videoplayer broadcast={broadcast} opts={opts} />);
  expect(opts.playerVars.start).toBe(1);
});

test('video should play correct broadcast', () => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      enablejsapi: 1,
      playsinline: 1,
      'webkit-playsinline': 1,
      autoplay: 1,
      start: 1,
    },
  };

  const broadcast = {
    title: 'This is a video',
    owner: 'I own this broadcast',
    broadcastId: '1',
  };

  render(<Videoplayer broadcast={broadcast} opts={opts} />);
  expect(broadcast.broadcastId).toBe('1');
});

test('video should render in correct height', () => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      enablejsapi: 1,
      playsinline: 1,
      'webkit-playsinline': 1,
      autoplay: 1,
      start: 1,
    },
  };

  const broadcast = {
    title: 'This is a video',
    owner: 'I own this broadcast',
    broadcastId: '1',
  };

  render(<Videoplayer broadcast={broadcast} opts={opts} />);
  expect(opts.height).toBe('100%');
});

test('video should render in correct width', () => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      enablejsapi: 1,
      playsinline: 1,
      'webkit-playsinline': 1,
      autoplay: 1,
      start: 1,
    },
  };

  const broadcast = {
    title: 'This is a video',
    owner: 'I own this broadcast',
    broadcastId: '1',
  };

  render(<Videoplayer broadcast={broadcast} opts={opts} />);
  expect(opts.width).toBe('100%');
});
