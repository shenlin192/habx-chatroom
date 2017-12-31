/**
 * Created by shenlin on 31/12/2017.
 */
const ChatRoomModel = require('../database/chatRoom.model');

function chatRoomSocket(io) {
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
}


module.exports = chatRoomSocket;
