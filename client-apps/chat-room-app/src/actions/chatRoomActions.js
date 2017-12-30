/**
 * Created by shenlin on 26/12/2017.
 */

export function setTempMessage(value) {
  return {
    type: 'SET_TEMP_MESSAGE',
    payload: value,
  };
}

export function setTempUserName(value) {
  return {
    type: 'SET_TEMP_USER_NAME',
    payload: value,
  };
}

export function setUserName(userName) {
  sessionStorage.setItem('name', userName);
  return {
    type: 'SET_USER_NAME',
    payload: userName,
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

export function updateMessage(updatedUser) {
  return {
    type: 'UPDATE_MESSAGE',
    payload: updatedUser,
  };
}