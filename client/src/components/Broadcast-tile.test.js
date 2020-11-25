import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import BroadcastTile from './Broadcast-tile.jsx';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('title should render on broadcast tile', () => {
  const broadcast = {
    title: 'This is a video',
    owner: 'I own this broadcast',
    broadcastId: '1',
  };
  const { getByText } = render(<BroadcastTile broadcast={broadcast} />);
  const title = getByText(broadcast.title);

  expect(title).toBeInTheDocument();
});

test('owner should render on broadcast tile', () => {
  const broadcast = {
    title: 'This is a video',
    owner: 'I own this broadcast',
    broadcastId: '1',
  };

  const { getByText } = render(<BroadcastTile broadcast={broadcast} />);
  const owner = getByText(broadcast.owner);
  expect(owner).toBeInTheDocument();
});

test('clicking on broadcast tile should render broadcast', () => {
  const history = createMemoryHistory();
  const broadcast = {
    title: 'This is a video',
    owner: 'I own this broadcast',
    broadcastId: 1,
  };

  const { getByTestId } = render(
    <Router history={history}>
      <BroadcastTile broadcast={broadcast} />
    </Router>
  );
  const tileClick = getByTestId('tile-click');
  fireEvent.click(tileClick);
  expect(history.location.pathname).toBe(`/b/${broadcast.broadcastId}`);
});
