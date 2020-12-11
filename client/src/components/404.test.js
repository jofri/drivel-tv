import { render, screen } from '@testing-library/react';
import React from 'react';
import FourOFour from './404.jsx';

test('404 page should render correctly', () => {
  render(<FourOFour />);
  const expected = screen.getByText(
    /404 - Page or Broadcast not found on server/
  );
  expect(expected).toBeInTheDocument();
});
