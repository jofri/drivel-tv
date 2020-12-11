import { render, screen } from '@testing-library/react';
import React from 'react';
import Navbar from './Navbar.jsx';

test('home button should render on navbar', () => {
  render(<Navbar />);
  const home = screen.getByText(/Home/);
  expect(home).toBeInTheDocument();
});

test('home button click should navigate to home screen', async () => {
  render(<Navbar />);
  expect(screen.getByText(/Home/).href).toBe('http://localhost/');
});

test('profile button should render on navbar', () => {
  render(<Navbar />);
  const profile = screen.getByText(/Profile/);
  expect(profile).toBeInTheDocument();
});

test('profile button click should navigate to profile screen', async () => {
  render(<Navbar />);
  expect(screen.getByText(/Profile/).href).toBe('http://localhost/profile');
});

test('Create broadcast button should render on navbar', () => {
  render(<Navbar />);
  const createBroadcast = screen.getByText(/Create broadcast/);
  expect(createBroadcast).toBeInTheDocument();
});

test('Create broadcast button click should navigate to Create broadcast screen', async () => {
  render(<Navbar />);
  expect(screen.getByText(/Create broadcast/).href).toBe(
    'http://localhost/create-broadcast'
  );
});

test('Delete broadcast button should render on navbar', () => {
  render(<Navbar />);
  const deleteBroadcast = screen.getByText(/Delete broadcast/);
  expect(deleteBroadcast).toBeInTheDocument();
});

test('Delete broadcast button click should navigate to Delete broadcast screen', async () => {
  render(<Navbar />);
  expect(screen.getByText(/Delete broadcast/).href).toBe(
    'http://localhost/delete-broadcast'
  );
});

test('Log out broadcast button should render on navbar', () => {
  render(<Navbar />);
  const logout = screen.getByText(/Log out/);
  expect(logout).toBeInTheDocument();
});

test('Log out button click should navigate to Log out screen', async () => {
  render(<Navbar />);
  expect(screen.getByText(/Log out/).href).toBe('http://localhost/log-out');
});
