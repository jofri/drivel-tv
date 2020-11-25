import userEvent from '@testing-library/user-event';
import { render, fireEvent, queryByTestId } from '@testing-library/react';
import React from 'react';
import Chat from './Chat.jsx';
import io from 'socket.io-client';

test('app should get all messages', () => {
  //render the app
  window.HTMLElement.prototype.scrollIntoView = function () {};

  const utils = render(
    <Chat
      allMessages={[{ sender: 'guest', msg: 'hello' }]}
      data={''}
      emitMsg={() => {}}
    />
  );

  // fireEvent.change(utils.getByTestId('scroll'));

  expect(utils.getByText('hello')).toBeInTheDocument();
});

test('on submit the new message should be rendered', () => {
  const emitMessage = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = function () {};
  // const messagesEndRef = { current: { scrollIntoView: jest.fn() } };
  const { getByTestId } = render(
    <Chat allMessages={[]} data={''} emitMsg={emitMessage} />
  );
  const form = getByTestId('form');

  // fireEvent.change(queryByTestId('input'), { target: { value: 'test' } });
  userEvent.type(getByTestId('input'), 'a');
  fireEvent.submit(form);
  // //check how to trigger an onSubmit
  expect(emitMessage).toHaveBeenCalled();
});

// test('on submit the new message should be rendered', () => {
//   const emitMessage = jest.fn(()=>{sender: 'guest', msg: 'hello'});
//   const { getByTestId, getByText } = render(
//     <Chat allMessages={[]} data={''} emitMsg={emitMessage} />
//   );
//   const form = getByTestId('form');

//   // fireEvent.change(queryByTestId('input'), { target: { value: 'test' } });
//   userEvent.type(getByTestId('input'), 'hello');
//   fireEvent.submit(form);
//   // //check how to trigger an onSubmit
//   expect(getByText('hello')).toBeInTheDocument();
// });

//send a test message
// let socket = io.conect();
// socket.emit('message', {
//   sender: 'guest',
//   msg: 'Loving this playlist!',
//   room: 'test-room',
// });
//check message appears in message section
// const messageSection = utils.getByTestId('chatList');
// //check within message sectionto find received messages
// expect(
//   within(messageSection).getBytext('Loving this playlist!')
// ).toBeTruthy();
