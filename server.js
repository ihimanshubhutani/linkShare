var express = require('express');
var app = express();
var server = require('http').createServer(app);
const io = require('socket.io')(server)

const users = {}
const connection=[];

app.use(express.static('public'));

server.listen(process.env.PORT || 3000);

io.sockets.on('connection', socket => {
    connection.push(socket);
  
  socket.on('new-user',data => {
    console.log('new user joined');
    console.log(data);
    console.log(data.room);

    socket.join(data.room);
    users[socket.id] = data.name;
    io.sockets.to(data.room).emit('user-connected', data.name)
  })


  socket.on('send-chat-message', data => {
    console.log('send-chatmessage');
    console.log(data);
    io.sockets.to(data.room).emit('chat-message', { message: data.message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})