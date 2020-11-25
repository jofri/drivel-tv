import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import Videoplayer from './Videoplayer.jsx';

test('home button should render on navbar', () => {
  render(<Navbar />);
  const home = screen.getByText(/Home/);
  expect(home).toBeInTheDocument();
});
