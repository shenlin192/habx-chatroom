const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');
const index = require('./routes/index');
const chatRoom = require('./routes/chatRoom');
const chatRoomSocket = require('./services/websocket/chatRoom.socket');

const app = express();

// Socket.io
const server = http.Server(app);
const io = socketIo(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/chat-room', chatRoom);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client-apps/chat-room-app/build')));

// add socket io to response and to app
app.use((req, res, next) => {
  res.io = io;
  next();
});
chatRoomSocket(io);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, server };
