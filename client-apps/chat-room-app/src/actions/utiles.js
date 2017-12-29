/**
 * Created by shenlin on 27/12/2017.
 */
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function messagesTransform(responseData) {
  const { users } = responseData;

  const roomMessages = [];
  // check room has user
  if (users.length) {
    users.forEach((user) => {
      // check user has message
      if (user.messages.length) {
        user.messages.forEach((message) => {
          roomMessages.push({
            name: user.name,
            userId: user._id,
            color: user.color,
            content: message.content,
            date: message.date,
          });
        });
      }
    });
  }

  // sort messages by date
  roomMessages.sort((m1, m2) =>
    new Date(m1.date).getTime() - new Date(m2.date).getTime());

  return roomMessages;
}
