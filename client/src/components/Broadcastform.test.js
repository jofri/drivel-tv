import { render, screen } from '@testing-library/react';
import React from 'react';
import Broadcastform from './Broadcastform.jsx';

test('Delete form should render correctly', () => {
  render(<Broadcastform />);
  const expected = screen.getByText(/Create a new broadcast/);
  expect(expected).toBeInTheDocument();
});
