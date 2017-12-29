/**
 * Created by shenlin on 25/12/2017.
 */

export default function reducer(state = {
  fetching: false,
  fetched: false,
  error: null,
  showChatRoom: Boolean(localStorage.id),
  messages: [],
  tempInputValue: '',
  user: {
    id: localStorage.id,
    name: localStorage.name,
    color: localStorage.color,
  },
}, action) {
  switch (action.type) {
    case 'FETCH_CHAT': {
      return { ...state, fetching: true };
    }
    case 'FETCH_CHAT_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_CHAT_FULFILLED': {
      return {
        ...state, fetching: false, fetched: true, messages: action.payload, 
      };
    }
    case 'SHOW_CHAT_ROOM': {
      return { ...state, showChatRoom: action.payload };
    }
    case 'ADD_USER': {
      return { ...state, user: action.payload };
    }
    case 'SET_INPUT_VALUE': {
      return { ...state, tempInputValue: action.payload };
    }
    case 'RECEIVE_MESSAGE': {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    default:
      return state;
  }
}

