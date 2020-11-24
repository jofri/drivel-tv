/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import BroadcastInterface from '../interfaces/Broadcast';
import { getBroadcast, getAllBroadcasts } from '../App';
import { apiGetAllBroadcasts, apiGetBroadcast } from './apiService';
import broadcast from '../__mocks__/api';

jest.mock('fetch');

// beforeEach( async () => {
//   apiGetAllBroadcasts().then(data => console.log(data)).catch(err => console.error(err));
//   // const test = await getAllBroadcasts();
//   // console.log(test);
// });

it('return broadcastObj', async (done) => {
  fetch.mockResolvedValue(broadcast);
  const broadcastObj: boolean | BroadcastInterface = await apiGetBroadcast('12376');
  expect(broadcastObj).toEqual(broadcast);
  expect(broadcastObj).toBeTruthy;

  done();
  // console.log(broadcast);
  // fetch.mockResolvedValue(broadcast);
  // const broadcastObj = await apiGetBroadcast('12376');
  // expect(broadcastObj).toEqual(broadcast);
});

// it('return all broadcasts', (done) => {
//   const allBroadcastObjects = apiGetAllBroadcasts();
//   expect(allBroadcastObjects).toBeTruthy();
//   done();
//   // console.log(broadcast);
// });

// test('return all broadcasts', (done) => {
//   apiGetAllBroadcasts().then((data) => {
//     console.log(data);
//     expect(data).toBeTruthy;
//     done();
//   })
// })
