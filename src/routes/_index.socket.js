const socketIO  = require('socket.io');
const server = require('../app');
const io = socketIO( server );

io.on('connection', () => {
    console.log('new connection ')
})

module.exports = socketIO;