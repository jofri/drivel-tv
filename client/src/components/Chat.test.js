import { render, within } from '@testing-library/react';
import React from 'react';
import Chat from './Chat.jsx';
import io from 'socket.io-client';

test('app should get all messages', () => {
  //render the app
  const utils = render(
    <Chat
      allMessages={[{ sender: 'guest', msg: 'hello' }]}
      data={''}
      emitMsg={() => {}}
    />
  );

  expect(utils.getByText('hello')).toBeInTheDocument();
});

test('on submit the new message should be rendered', () => {
  const emitMessage = jest.fn();
  const utils = render(
    <Chat allMessages={[]} data={''} emitMsg={emitMessage} />
  );
  //check how to trigger an onSubmit
  expect(emitMessage).toHaveBeenCalled();
});

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
