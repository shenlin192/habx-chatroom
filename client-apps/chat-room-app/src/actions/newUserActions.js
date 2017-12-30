/**
 * Created by shenlin on 26/12/2017.
 */
import axios from 'axios';
import { getRandomColor } from './utiles';

export function addNewUser(username) {
  return dispatch => axios.post('/chat-room/add-user', {
    username,
    color: getRandomColor(),
  })
    .then((response) => {
      const { user } = response.data;
      sessionStorage.setItem('id', user._id);
      sessionStorage.setItem('name', user.name);
      sessionStorage.setItem('color', user.color);
      const payload = {
        id: user._id,
        name: user.name,
        color: user.color,
      };
      dispatch({ type: 'ADD_USER', payload });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function showChatRoom(flag) {
  return {
    type: 'SHOW_CHAT_ROOM',
    payload: flag,
  };
}
