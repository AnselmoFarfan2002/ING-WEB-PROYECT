const m3 = {};

m3.comunicador = require('../controllers/module 3 - users communication/comunicador');

const iniciador = ( io ) => { io.on('connection', async socket => {
    socket.join( socket.username )

    socket.on('client:message', m3.comunicador.ENVIAR_MENSAJE )
})} 

module.exports = iniciador;