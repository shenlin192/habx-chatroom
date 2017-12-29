/**
 * Created by shenlin on 27/12/2017.
 */
import axios from 'axios';
import { messagesTransform } from './utiles';

export function fetchChat() {
  return function (dispatch) {
    dispatch({ type: 'FETCH_CHAT' });

    return axios.get('/chat-room/room-info')
      .then((response) => {
        const messages = messagesTransform(response.data);
        dispatch({ type: 'FETCH_CHAT_FULFILLED', payload: messages });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_CHAT_REJECTED', payload: err });
      });
  };
}
