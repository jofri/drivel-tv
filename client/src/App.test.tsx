/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import FourOFour from './components/404';
import DeleteForm from './components/Deleteform';
import Broadcastform from './components/Broadcastform';
// import Homepage from './components/Homepage';
// import Broadcast from './components/Broadcast';
// import Navbar from './components/Navbar';

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

// test('landing on Homepage', () => {
//   const history = createMemoryHistory();
//   history.push('/');
//   render(
//     <Router history={history}>
//       <Route exact path="/">
//         {' '}
//         {/* If user visits root, redict to homepage */}
//         <Homepage allBroadcasts={history} getAllBroadcasts={history} />
//       </Route>
//     </Router>,
//   );
//   expect(screen.getByText('Drivel.TV'));
// });
test('landing on Create Broadcast page', () => {
  const history = createMemoryHistory();
  history.push('/create-broadcast');
  render(
    <Router history={history}>
      <Route exact path="/create-broadcast">
        <Broadcastform />
      </Route>
    </Router>,
  );
  expect(screen.getByText('Create a new broadcast'));
});
test('landing on Delete Broadcast page', () => {
  const history = createMemoryHistory();
  history.push('/delete-broadcast');
  render(
    <Router history={history}>
      <Route exact path="/delete-broadcast">
        <DeleteForm />
      </Route>
    </Router>,
  );
  expect(screen.getByText('Delete broadcast'));
});
// test('landing on Broadcast page', () => {
//   const history = createMemoryHistory();
//   history.push('/{broadcastUrl}');
//   render(
//     <Router history={history}>
//       {/* <Route exact path={history}>
//         {' '} */}
//       <Broadcast broadcast={history} getBroadcast={history} />
//       {/* </Route> */}
//     </Router>,
//   );
//   expect(screen.getByText('Test'));
// });
test('landing on 404 page', () => {
  const history = createMemoryHistory();
  history.push('/404');
  render(
    <Router history={history}>
      <Route exact path="/404">
        {' '}
        {/* Specify 404 route */}
        <FourOFour />
      </Route>
    </Router>,
  );
  expect(screen.getByText('404 - Page or Broadcast not found on server'));
});
test('landing on an empty page', () => {
  const history = createMemoryHistory();
  history.push('/');
  render(
    <Router history={history}>
      <Route path="/">
        {' '}
        {/* If user visits any page not specified, redirect to 404 */}
        <FourOFour />
      </Route>
    </Router>,
  );
  expect(screen.getByText('404 - Page or Broadcast not found on server'));
});

// test('it expands when the input is clicked', () => {
//   render(<Navbar />);
// });
