const express = require('express');
const ChatRoomModel = require('../services/database/chatRoom.model');

const router = express.Router();

async function getCurrentRoom() {
  // return the first room in a single room app
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

module.exports = router;
