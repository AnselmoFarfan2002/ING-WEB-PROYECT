const m3 = {};

m3.comunicador = require('../controllers/module 3 - users communication/comunicador');
m3.notificador = require('../controllers/module 3 - users communication/notificador');

const iniciador = ( io ) => { io.on('connection', async socket => {
    socket.join( socket.username );
    
    m3.comunicador.ENVIAR_MENSAJE( socket );
    m3.notificador.MARCAR_COMO_LEIDO(socket);
    m3.notificador.NUEVA_NOTIFICACION(socket);
})} 

module.exports = iniciador;