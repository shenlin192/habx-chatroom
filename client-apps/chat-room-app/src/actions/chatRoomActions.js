/**
 * Created by shenlin on 26/12/2017.
 */

export function setInputValue(value) {
  return {
    type: 'SET_INPUT_VALUE',
    payload: value,
  };
}

export function receiveMessage(message) {
  return {
    type: 'RECEIVE_MESSAGE',
    payload: message,
  };
}

export function addMessage(user, message) {
  const payload = {
    name: user.name,
    userId: user.id,
    color: user.color,
    content: message,
    date: new Date().toISOString(),
  };
  return {
    type: 'RECEIVE_MESSAGE',
    payload,
  };
}