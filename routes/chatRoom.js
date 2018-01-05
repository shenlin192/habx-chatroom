const express = require('express');
const { getCurrentRoom, addUser } = require('../services/database/utiles');

const router = express.Router();


router.get('/', (req, res, next) => {
  res.sendFile('client-apps/chat-room-app/build/index.html', { root: './' });
});

router.get('/room-info', (req, res, next) => {
  getCurrentRoom().then((currentRoom) => {
    res.json(currentRoom);
  });
});

router.post('/add-user', (req, res, next) => {
  const userInfo = {
    name: req.body.username,
    color: req.body.color,
  };
  addUser(userInfo).then((newUser) => {
    res.json({ user: newUser });
  });
});

module.exports = router;
