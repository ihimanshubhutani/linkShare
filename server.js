const io = require('socket.io')(3000)

const users = {}
const connection=[];

io.sockets.on('connection', socket => {
    connection.push(socket);
  
  socket.on('new-user',data => {
    socket.join(data.room);
    users[socket.id] = data.name;
    io.sockets.to(data.room).emit('user-connected', data.name)
  })


  socket.on('send-chat-message', data => {
    io.sockets.to(data.room).emit('chat-message', { message: data.message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})