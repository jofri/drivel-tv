import { render, screen } from '@testing-library/react';
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
