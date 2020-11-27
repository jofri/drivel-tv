/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import FourOFour from '../404';

describe('404', () => {
  test('Renders 404 page', () => {
    render(
      <FourOFour />,
    );
    expect(screen.getByText('404 - Page or Broadcast not found on server')).toBeInTheDocument();
  });
});
