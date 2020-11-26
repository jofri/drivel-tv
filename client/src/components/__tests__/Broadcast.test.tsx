/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { BroadcastInterface } from '../../interfaces/Broadcast';
import broadcastMock from '../../__mocks__/mockData';
import Broadcast from '../Broadcast';

describe('Broadcast', () => {
  const broadcast: BroadcastInterface = broadcastMock;
  const getBroadcast = jest.fn();

  test('Renders broadcast', () => {
    const { getByText } = render(
      <Broadcast broadcast={broadcast} getBroadcast={getBroadcast} />,
      { wrapper: MemoryRouter },
    );
    expect(getByText('Send')).toBeInTheDocument();
  });
});
