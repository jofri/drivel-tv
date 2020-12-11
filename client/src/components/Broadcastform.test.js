import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Broadcastform from './Broadcastform.jsx';

test('Create form should render correctly', () => {
  render(<Broadcastform />);
  const expected = screen.getByText(/Create a new broadcast/);
  expect(expected).toBeInTheDocument();
  const expected2 = screen.getByText(/Broadcast name:/);
  expect(expected2).toBeInTheDocument();
  const expected3 = screen.getByText(/Description:/);
  expect(expected3).toBeInTheDocument();
  const expected4 = screen.getByText(/Tags:/);
  expect(expected4).toBeInTheDocument();
  const expected5 = screen.getByText(/Owner:/);
  expect(expected5).toBeInTheDocument();
  const expected6 = screen.getByText(/Playlists:/);
  expect(expected6).toBeInTheDocument();
  const expected7 = screen.getByText(
    /Want to reverse the queue order of the playlists?/
  );
  expect(expected7).toBeInTheDocument();
  const expected8 = screen.getByText(/Create Broadcast/);
  expect(expected8).toBeInTheDocument();
});

test('On submit should fire correctly', () => {
  const { getByTestId } = render(<Broadcastform />);
  const form = getByTestId('form');
  userEvent.type(getByTestId('title'), 'testing');
  userEvent.type(getByTestId('owner'), 'testing');
  userEvent.type(getByTestId('url'), 'testing');
  fireEvent.submit(form);
});
