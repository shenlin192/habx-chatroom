/**
 * Created by shenlin on 01/01/2018.
 */

const initialRoom = {
  fetching: false,
  fetched: false,
  error: null,
  showChatRoom: Boolean(sessionStorage.id),
  messages: [],
  tempMessage: '',
  tempUserName: '',
  user: {
    id: sessionStorage.id,
    name: sessionStorage.name,
    color: sessionStorage.color,
  },
};

const chatRoomInfo = {
  _id: '5a4a79e13fcb523f1878684b',
  roomName: 'habx',
  __v: 8,
  users: [{
    name: 'user 1', color: '#9338C8', _id: '5a4a79ec3fcb523f1878684c', messages: [{ content: 'hello everyone', _id: '5a4a7a083fcb523f1878684f', date: '2018-01-01T18:12:24.098Z' }, { content: 'Do you know server side rendering?', _id: '5a4a7a313fcb523f18786852', date: '2018-01-01T18:13:05.520Z' }],
  }, {
    name: 'jack', color: '#07D0DA', _id: '5a4a79f23fcb523f1878684d', messages: [{ content: 'Hello I love javascript', _id: '5a4a7a123fcb523f18786850', date: '2018-01-01T18:12:34.997Z' }, { content: "I've heard about that", _id: '5a4a7a3e3fcb523f18786853', date: '2018-01-01T18:13:18.585Z' }], 
  }, {
    name: 'alice', color: '#484340', _id: '5a4a79fb3fcb523f1878684e', messages: [{ content: 'I love javascript too', _id: '5a4a7a1b3fcb523f18786851', date: '2018-01-01T18:12:43.691Z' }], 
  }], 
};

const user = {
  id: '5a4a79fb3fcb523f1878684e',
  name: 'alice',
  color: '#484340',
};

const newMessage = {
  name: 'user 1',
  userId: '5a4a79ec3fcb523f1878684c',
  color: '#9338C8',
  content: 'I love CSS',
  date: '2018-01-01T18:18:24.098Z',
};

const messages =
[
  {
    name: 'user 1',
    userId: '5a4a79ec3fcb523f1878684c',
    color: '#9338C8',
    content: 'hello everyone',
    date: '2018-01-01T18:12:24.098Z',
  },
  {
    name: 'jack',
    userId: '5a4a79f23fcb523f1878684d',
    color: '#07D0DA',
    content: 'Hello I love javascript',
    date: '2018-01-01T18:12:34.997Z',
  },
  {
    name: 'alice',
    userId: '5a4a79fb3fcb523f1878684e',
    color: '#484340',
    content: 'I love javascript too',
    date: '2018-01-01T18:12:43.691Z',
  },
  {
    name: 'user 1',
    userId: '5a4a79ec3fcb523f1878684c',
    color: '#9338C8',
    content: 'Do you know server side rendering?',
    date: '2018-01-01T18:13:05.520Z',
  },
  {
    name: 'jack',
    userId: '5a4a79f23fcb523f1878684d',
    color: '#07D0DA',
    content: "I've heard about that",
    date: '2018-01-01T18:13:18.585Z',
  },
];

export {
  initialRoom,
  user,
  messages,
  newMessage,
  chatRoomInfo,
};
