import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders homepage', () => {
  const { getByTestId } = render(<App />);
  const linkElement = getByTestId('homepage');
  expect(linkElement).toBeInTheDocument();
});

test('rendersnavbar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Drivel.TV/i);
  expect(linkElement).toBeInTheDocument();
});
