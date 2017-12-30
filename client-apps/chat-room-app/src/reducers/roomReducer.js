/**
 * Created by shenlin on 25/12/2017.
 */

export default function reducer(state = {
  fetching: false,
  fetched: false,
  error: null,
  showChatRoom: Boolean(sessionStorage.id),
  messages: [],
  tempMessage: ' ',
  tempUserName: ' ',
  user: {
    id: sessionStorage.id,
    name: sessionStorage.name,
    color: sessionStorage.color,
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
      return { ...state, user: action.payload, tempUserName: action.payload.name };
    }
    case 'SET_TEMP_MESSAGE': {
      return { ...state, tempMessage: action.payload };
    }
    case 'SET_TEMP_USER_NAME': {
      return { ...state, tempUserName: action.payload };
    }
    case 'SET_USER_NAME': {
      return {
        ...state,
        user: {
          ...state.user, name: action.payload,
        },
        messages: state.messages.map((message) => {
          if (message.userId === state.user.id) {
            return Object.assign(message, { name: action.payload });
          }
          return message;
        }),
      };
    }
    case 'UPDATE_MESSAGE': {
      return {
        ...state,
        messages: state.messages.map((message) => {
          if (message.userId === action.payload.id) {
            return Object.assign(message, { name: action.payload.name });
          }
          return message;
        }),
      };
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

