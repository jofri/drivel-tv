import { render, screen } from '@testing-library/react';
import React from 'react';
import Navbar from './Navbar.jsx';

test('home button should render on navbar', () => {
  render(<Navbar />);
  const home = screen.getByText(/Home/);
  expect(home).toBeInTheDocument();
});

test('profile button should render on navbar', () => {
  render(<Navbar />);
  const profile = screen.getByText(/Profile/);
  expect(profile).toBeInTheDocument();
});

test('Create broadcast button should render on navbar', () => {
  render(<Navbar />);
  const createBroadcast = screen.getByText(/Create broadcast/);
  expect(createBroadcast).toBeInTheDocument();
});

test('Delete broadcast button should render on navbar', () => {
  render(<Navbar />);
  const deleteBroadcast = screen.getByText(/Delete broadcast/);
  expect(deleteBroadcast).toBeInTheDocument();
});

test('Log out broadcast button should render on navbar', () => {
  render(<Navbar />);
  const logout = screen.getByText(/Log out/);
  expect(logout).toBeInTheDocument();
});
