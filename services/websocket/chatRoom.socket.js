/**
 * Created by shenlin on 31/12/2017.
 */
const { changeUserName, sendMessage } = require('../database/utiles');

function chatRoomSocket(io) {
  io.on('connection', (socket) => {
    // handle send message
    socket.on('message', async (data) => {
      const currentUser = await sendMessage(data);
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
      await changeUserName(updatedUser);
      socket.broadcast.emit('changeUserName', updatedUser);
    });
  });
}

module.exports = chatRoomSocket;
