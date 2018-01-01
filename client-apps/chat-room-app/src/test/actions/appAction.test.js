/**
 * Created by shenlin on 01/01/2018.
 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as data from '../mock';
import { fetchChat } from '../../actions/appActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);


describe('async actions', () => {
  mock.onGet('/chat-room/room-info').reply(200, data.chatRoomInfo);

  it('creates FETCH_CHAT_FULFILLED when fetching stock has been done', () => {
    const expectedActions = [
      { type: 'FETCH_CHAT' },
      {
        type: 'FETCH_CHAT_FULFILLED',
        payload: data.messages,
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchChat()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
