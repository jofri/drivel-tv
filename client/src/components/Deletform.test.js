import { render, screen } from '@testing-library/react';
import React from 'react';
import Deleteform from './Deleteform.jsx';

test('Delete form should render correctly', () => {
  render(<Deleteform />);
  const expected = screen.getByText(/Delete broadcast/);
  expect(expected).toBeInTheDocument();
});
