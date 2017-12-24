/**
 * Created by shenlin on 03/11/2017.
 */
const db = require('./db');

const ChartRoom = db.model('ChartRoom', {
  roomName: String,
  message: [
    {
      userName: String,
      message: String,
    },
  ],
});

module.exports = ChartRoom;
