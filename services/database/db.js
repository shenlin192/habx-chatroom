/**
 * Created by shenlin on 03/11/2017.
 */
const mongoose = require('mongoose');

let dbURL;

switch (process.env.NODE_ENV) {
  case 'development':
    dbURL = process.env.DB_URL_DEV;
    break;
  case 'test':
    dbURL = process.env.DB_URL_TEST;
    break;
  case 'production':
    dbURL = process.env.DB_URL_PRO;
    break;
  default:
    dbURL = process.env.DB_URL_PRO;
}


mongoose.connect(dbURL, {
  useMongoClient: true,
}).then(() => {
  console.log('connection successed');
}).catch((e) => {
  console.error('connection failed', e);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
