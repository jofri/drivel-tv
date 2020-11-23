/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// test('should go to the home page when clicked', () => {
//   render(<Navbar />);
//   fireEvent.click(screen.queryByText('Drivel.TV'));
//   expect
// });
test('captures clicks', () => {
  const history = createMemoryHistory();
  const sendToHome = () => {
    history.push('/');
  };
  render(
    <div onClick={sendToHome}>
      <p className="logo-text">Drivel.TV</p>
    </div>,
  );
  fireEvent.click(screen.queryByText('Drivel.TV'));
  expect(history.location.pathname).toBe('/');
});
