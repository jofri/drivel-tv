/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import React from 'react';
import {
  BrowserRouter, MemoryRouter, Router,
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';
import App from './App';
import FourOFour from './components/404';
import DeleteForm from './components/Deleteform';
import Broadcastform from './components/Broadcastform';
import broadcastMock from './__mocks__/mockData';

test('renders jump to live text on the button', () => {
  render(<App />);
  const jumpToLiveButton = screen.getByText('JUMP TO LIVE');
  expect(jumpToLiveButton).toBeInTheDocument();
});
test('renders find broadcast', () => {
  render(<App />);
  const findBroadcast = screen.queryByText('Find broadcast');
  expect(findBroadcast).not.toBeInTheDocument();
});

test('full app rendering', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(screen.getByText('Drivel.TV'));
});
test('renders correctly, snapshot', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('landing on Create Broadcast page', () => {
  const renderRoutes = (component: any, { route = '/' } = {}) => {
    window.history.pushState({}, 'CreateForm', route);
    return render(component, { wrapper: BrowserRouter });
  };
  renderRoutes(<Broadcastform />, { route: '/create-broadcast' });
  expect(screen.getByText('Create a new broadcast')).toBeInTheDocument();
});
test('landing on Delete Broadcast page', () => {
  const renderRoutes = (component: any, { route = '/' } = {}) => {
    window.history.pushState({}, 'DeleteForm', route);
    return render(component, { wrapper: BrowserRouter });
  };
  renderRoutes(<DeleteForm />, { route: '/delete-broadcast' });
  expect(screen.getByText('Delete broadcast')).toBeInTheDocument();
});
test('landing on 404 page', () => {
  const renderRoutes = (component: any, { route = '/404' } = {}) => {
    window.history.pushState({}, 'FourOFour', route);
    return render(component, { wrapper: BrowserRouter });
  };
  renderRoutes(<FourOFour />, { route: '/404' });
  expect(screen.getByText('404 - Page or Broadcast not found on server')).toBeInTheDocument();
});
test('landing on an empty page', async () => {
  const renderRoutes = (component: any, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(component, { wrapper: BrowserRouter });
  };
  renderRoutes(<App />, { route: '/something' });
  expect(screen.getByText(/404/)).toBeInTheDocument();
});
test('get all Broadcasts', () => {
  const data = broadcastMock;
  const mockFn = jest.fn().mockResolvedValue([data, data]);
  jest.mock('./services/apiService', () => ({
    __esModule: true,
    apiGetAllBroadcasts: mockFn,
  }));
  const { getAllByTestId, getByText } = render(<App />, { wrapper: MemoryRouter });
  const getLiveButton = getByText('JUMP TO LIVE');
  fireEvent.click(getLiveButton);
  waitFor(() => {
    const broadcastTiles = getAllByTestId('broadcast-tile');
    expect(broadcastTiles.length).toBe(2);
    getByText('test Title');
    expect(mockFn).toBeCalled();
  });
});
