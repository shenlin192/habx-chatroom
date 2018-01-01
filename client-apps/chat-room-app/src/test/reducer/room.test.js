/**
 * Created by shenlin on 01/01/2018.
 */
import reducer from '../../reducers/roomReducer';
import * as data from '../mock';

describe('Test initial state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(data.initialRoom);
  });
});


describe('Test SHOW_CHAT_ROOM', () => {
  it('should show chat room', () => {
    const action1 = {
      type: 'SHOW_CHAT_ROOM',
      payload: true,
    };
    expect(reducer(undefined, action1).showChatRoom).toEqual(true);
    const action2 = {
      type: 'SHOW_CHAT_ROOM',
      payload: false,
    };
    expect(reducer(undefined, action2).showChatRoom).toEqual(false);
  });
});


describe('Test SET_USER_NAME', () => {
  it('should update user name', () => {
    const action = {
      type: 'SET_USER_NAME',
      payload: 'new name',
    };
    const result = reducer({ user: data.user, messages: data.messages }, action);
    expect(result.user.name).toEqual('new name');
    expect(result.messages[2].name).toEqual('new name');
  });
});


describe('Test UPDATE_MESSAGE', () => {
  it('should update message', () => {
    const action = {
      type: 'UPDATE_MESSAGE',
      payload: {
        id: '5a4a79ec3fcb523f1878684c',
        name: 'new name',
      },
    };
    const result = reducer({ messages: data.messages }, action);
    expect(result.messages[0].name).toEqual('new name');
    expect(result.messages[3].name).toEqual('new name');
  });
});


describe('Test RECEIVE_MESSAGE', () => {
  it('should add message', () => {
    const action = {
      type: 'RECEIVE_MESSAGE',
      payload: data.newMessage,
    };
    const result = reducer({ messages: data.messages }, action);
    expect(result.messages[result.messages.length - 1]).toEqual(data.newMessage);
  });
});
