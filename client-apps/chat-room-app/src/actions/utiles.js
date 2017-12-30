/**
 * Created by shenlin on 27/12/2017.
 */


/**
 * Randomly Generate a relative dark color
 * @returns {string}
 */
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    if (i < 2) {
      color += letters[Math.floor(Math.random() * 10)];
    } else {
      color += letters[Math.floor(Math.random() * 16)];
    }
  }
  return color;
}


/**
 * Transform messages into the following form and ordered by date
 * [{name:'String', userId:'String', color:'String', content:'String', date:'String'}, ...]
 * @param responseData
 * @returns {Array}
 */
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
