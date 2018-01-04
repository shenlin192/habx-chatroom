/**
 * Created by shenlin on 01/01/2018.
 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchChat } from '../../actions/appActions';
import * as utiles from '../../actions/utiles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);


describe('async actions', () => {
  mock.onGet('/chat-room/room-info').reply(200);

  it('creates FETCH_CHAT_FULFILLED when fetching stock has been done', () => {
    // mock the utiles function as we are not testing it here
    utiles.messagesTransform = jest.fn();
    utiles.messagesTransform.mockReturnValue('messages');

    const expectedActions = [
      { type: 'FETCH_CHAT' },
      {
        type: 'FETCH_CHAT_FULFILLED',
        payload: 'messages',
      },
    ];

    const store = mockStore({});

    return store.dispatch(fetchChat()).then(() => {
      // return of async actions
      expect(utiles.messagesTransform.mock.calls.length).toBe(1);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
