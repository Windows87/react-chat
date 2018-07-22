const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Message = require('./app/models/Message');

const usersArray = [];

server.listen(3001, () => {
  console.log('Running on port 3001');
});

io.on('connection', socket => {
  socket.on('user-connect', async (userData) => {
  	userData.socketId = socket.id;
  	usersArray.push(userData);
  	io.sockets.emit('users-connected', usersArray);

    console.log('Users online: ' + usersArray.length);

    try {
      const messages = await Message.find(); 
      io.sockets.emit('old-messages', messages);
    } catch (err) {
      io.sockets.emit('error', err);
    }
  });

  socket.on('send-message', async (messageData) => {
    try {
      const newMessage = await Message.create(messageData);
      console.log('> ' + messageData.username + ':' + messageData.message);
      io.sockets.emit('new-message', newMessage);
    } catch (err) {
      console.log(err);
      io.sockets.emit('error', err);
    }
  });

  socket.on('disconnect', () => {
  	usersArray.map((user, index) => {
  	  if(usersArray[index].socketId === socket.id)
  	  	return usersArray.splice(index, 1);
  	});

    console.log('Users online: ' + usersArray.length);

  	io.sockets.emit('users-connected', usersArray);
  });
});