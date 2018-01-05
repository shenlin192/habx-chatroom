/**
 * Created by shenlin on 05/01/2018.
 */
const ChatRoomModel = require('./chatRoom.model');


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


async function addUser(userInfo) {
  const currentRoom = await getCurrentRoom();

  currentRoom.users.push(userInfo);
  const result = await currentRoom.save();

  // response with the last saved user
  return result.users.slice(-1)[0];
}


async function changeUserName(updatedUser) {
  const currentRoom = await getCurrentRoom();
  const currentUserIndex = currentRoom.users.findIndex(user =>
    user._id.toString() === updatedUser.id);
  if (currentUserIndex < 0) {
    console.log('user not found');
    return;
  }
  currentRoom.users[currentUserIndex].name = updatedUser.name;
  await currentRoom.save();
}


async function sendMessage(data) {
  const currentRoom = await getCurrentRoom();
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

  return currentUser;
}


module.exports = {
  getCurrentRoom, addUser, changeUserName, sendMessage, 
};
