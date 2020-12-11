import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Deleteform from './Deleteform.jsx';

test('Delete form should render correctly', () => {
  render(<Deleteform />);
  const expected = screen.getByText(/Delete broadcast/);
  expect(expected).toBeInTheDocument();
  const expected2 = screen.getByText(/Broadcast id:/);
  expect(expected2).toBeInTheDocument();
  const expected3 = screen.getByText(/Delete Broadcast/);
  expect(expected3).toBeInTheDocument();
});

test('On submit should fire correctly', () => {
  const { getByTestId } = render(<Deleteform />);
  const form = getByTestId('form');
  userEvent.type(getByTestId('submit'), 'testing');
  fireEvent.submit(form);
});
