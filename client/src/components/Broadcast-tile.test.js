import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import BroadcastTile from './Broadcast-tile.test.jsx';

test('clicking on broadcast tile should render broadcast', () => {
  const { getByTestId } = render(<BroadcastTile />);
  const tileClick = getByTestId('tile-click');
  fireEvent.click(tileClick);
});
