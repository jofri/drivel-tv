/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import BroadcastForm from '../Broadcastform';

afterEach(cleanup);
describe('broadcast form', () => {
  test('renders form', () => {
    const { getByText } = render(
      <BroadcastForm />, { wrapper: MemoryRouter },

    );
    expect(getByText('Create a new broadcast')).toBeInTheDocument();
    expect(getByText('Broadcast name:').textContent).toBe('Broadcast name:');
  });
});
