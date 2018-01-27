
var express = require('express')
var app = express()
var server = app.listen(3000, () => console.log('Listening on port 3000'))

app.use(express.static('public'))

var socket = require('socket.io')
var io = socket(server);
io.sockets.on('connection', (s) => {
  console.log('new connection ' + s.id)

  s.on('mouse', (data) => {
    s.broadcast.emit('mouse', data)
  })
})

