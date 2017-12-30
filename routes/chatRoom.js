const express = require('express');
const ChatRoomModel = require('../services/database/chatRoom.model');

const router = express.Router();


async function getCurrentRoom() {
  let currentRoom = await ChatRoomModel.findOne({});

  if (!currentRoom) {
    const newRoom = new ChatRoomModel({
      roomName: 'habx',
    });
    await newRoom.save();
    currentRoom = await ChatRoomModel.findOne({});
  }
  return currentRoom;
}

router.get('/', (req, res, next) => {
  res.sendFile('client-apps/chat-room-app/build/index.html', { root: './' });
});

router.get('/room-info', (req, res, next) => {
  getCurrentRoom().then((currentRoom) => {
    res.json(currentRoom);
  });
});


router.post('/add-user', (req, res, next) => {
  async function addUser() {
    const currentRoom = await getCurrentRoom();

    currentRoom.users.push({
      name: req.body.username,
      color: req.body.color,
    });
    const result = await currentRoom.save();

    // response with the last saved user
    res.json({ user: result.users.slice(-1)[0] });
  }
  addUser();
});


function chatRoom(io) {
  io.on('connection', (socket) => {
    // handle send message
    socket.on('message', async (data) => {
      const currentRoom = await ChatRoomModel.findOne({});
      const currentUserIndex = currentRoom.users.findIndex(user =>
        user._id.toString() === data.user.id);

      if (currentUserIndex < 0) {
        console.log('user not found');
        return;
      }
      const message = {
        content: data.value,
        date: new Date(),
      };
      const currentUser = currentRoom.users[currentUserIndex];
      currentUser.messages.push(message);

      await currentRoom.save();

      socket.broadcast.emit('message', {
        name: currentUser.name,
        userId: currentUser._id.toString(),
        color: currentUser.color,
        content: data.value,
        date: new Date().toISOString(),
      });
    });

    // handle change user name
    socket.on('changeUserName', async (updatedUser) => {
      console.log(updatedUser);

      const currentRoom = await ChatRoomModel.findOne({});
      const currentUserIndex = currentRoom.users.findIndex(user =>
        user._id.toString() === updatedUser.id);
      if (currentUserIndex < 0) {
        console.log('user not found');
        return;
      }
      currentRoom.users[currentUserIndex].name = updatedUser.name;
      await currentRoom.save();

      socket.broadcast.emit('changeUserName', updatedUser);
    });
  });

  return router;
}


module.exports = chatRoom;
