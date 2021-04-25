//Aqui se especifica el puerto donde se va a conectar
const io = require('socket.io')(3000)

//se guarda en un arreglo el nombre de los usuarios
const users = {}

//al momento de que un usuario se conecte se le asigna un socket
io.on('connection', socket => {
  //se le asigna el nuevo usuario al socket creado, de igual manera se asigna un socketID
  socket.on('new-user', name => {
    users[socket.id] = name
    //damos a conocer que el usuario se ha conectado
    socket.broadcast.emit('user-connected', name)
  })
  //aqui se envia el mensaje usando .emit y le pasamos un string que
  //es el mensaje con el nombre de usuario
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })

  //esto para cuando se desconecta el usuario
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

/*correr con npm run devStart */