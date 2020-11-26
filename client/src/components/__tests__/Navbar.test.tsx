/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('NavBar', () => {
  test('calls sendToHome when Drivel.TV ', () => {
    const getAllBroadcasts = jest.fn();
    const { getByText } = render(<Navbar getAllBroadcasts={getAllBroadcasts} />, { wrapper: MemoryRouter });
    expect(getAllBroadcasts).not.toHaveBeenCalled();
    fireEvent.click(getByText('JUMP TO LIVE'));
    expect(getAllBroadcasts).toHaveBeenCalled();
  });
});
