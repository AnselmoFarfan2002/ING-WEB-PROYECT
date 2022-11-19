const iniciador = ( io ) => { io.on('connection', socket => {
    console.log(socket.id, socket.handshake.auth.username);

    socket.on('client:message', data => {
        console.log(socket.id);
        console.log(data);
    })

})}

module.exports = iniciador;