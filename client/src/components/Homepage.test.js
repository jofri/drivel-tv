import { render, screen } from '@testing-library/react';
import React from 'react';
import Homepage from './Homepage.jsx';

test('Home page should render all broadcasts', () => {
  render(
    <Homepage
      allBroadcasts={[
        {
          broadcastId: 'oYQBglh-G76tujPEnbXxQ',
          createdAt: '2020-11-23T11:06:12.463Z',
          currentTime: 60,
          currentVideo: '2Vv-BfVoq4g',
          currentVideoLength: 'PT4M40S',
          description: 'Test',
          isReversed: false,
          nextVideo: 'vgx-R_4s12U',
          nextVideoLength: 'PT3M38S',
          owner: 'Testing owner exists',
          tags: 'Test',
          thumbnailUrl: 'https://i.ytimg.com/vi/JGwWNGJdvx8/sddefault.jpg',
          title: 'Test',
          updatedAt: '2020-11-23T16:24:14.005Z',
          videoArray: [
            '2Vv-BfVoq4g',
            'vgx-R_4s12U',
            '5i6A1IHAQsg',
            'OPf0YbXqDm0',
            'JGwWNGJdvx8',
          ],
          youtubePlaylists: [
            'https://www.youtube.com/watch?v=JGwWNGJdvx8&list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',
          ],
          __v: 71,
          _id: '5fbb97a4c653585f414ffbb0',
        },
        {
          broadcastId: 'oYQBglh-G76tujPEnbXxZ',
          createdAt: '2020-11-23T11:06:12.463Z',
          currentTime: 60,
          currentVideo: '2Vv-BfVoq4g',
          currentVideoLength: 'PT4M40S',
          description: 'Test',
          isReversed: false,
          nextVideo: 'vgx-R_4s12U',
          nextVideoLength: 'PT3M38S',
          owner: 'Testing second owner exists',
          tags: 'Test',
          thumbnailUrl: 'https://i.ytimg.com/vi/JGwWNGJdvx8/sddefault.jpg',
          title: 'Test',
          updatedAt: '2020-11-23T16:24:14.005Z',
          videoArray: [
            '2Vv-BfVoq4g',
            'vgx-R_4s12U',
            '5i6A1IHAQsg',
            'OPf0YbXqDm0',
            'JGwWNGJdvx8',
          ],
          youtubePlaylists: [
            'https://www.youtube.com/watch?v=JGwWNGJdvx8&list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',
          ],
          __v: 71,
          _id: '5fbb97a4c653585f414ffbb1',
        },
      ]}
      getAllBroadcasts={() => {}}
    />
  );
  const first = screen.getByText(/Testing owner exists/);
  expect(first).toBeInTheDocument();
  const second = screen.getByText(/Testing second owner exists/);
  expect(second).toBeInTheDocument();
  const third = screen.queryByText(/Testing third owner doesn't exist/);
  expect(third).not.toBeInTheDocument();
});
