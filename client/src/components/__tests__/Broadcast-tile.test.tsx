/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { BroadcastInterface } from '../../interfaces/Broadcast';
import broadcastMock from '../../__mocks__/mockData';
import BroadcastTile from '../Broadcast-tile';

describe('Broadcast-tile', () => {
  test('Renders broadcast', async () => {
    const broadcast: BroadcastInterface = broadcastMock;
    const { location } = createMemoryHistory();
    const { getByText } = render(<BroadcastTile broadcast={broadcast} />, { wrapper: MemoryRouter });
    expect(screen.getByText('test Title')).toBeInTheDocument();
    expect(screen.getByText('test Owner')).toBeInTheDocument();
    fireEvent.click(getByText('test Owner'));
    waitFor(() => {
      expect(location.pathname).toBe(`/b/${broadcast.broadcastId}`);
    });
  });
});
