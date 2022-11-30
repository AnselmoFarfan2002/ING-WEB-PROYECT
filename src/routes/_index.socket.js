const m3 = {};

m3.comunicador = require('../controllers/module 3 - users communication/comunicador');

const iniciador = ( io ) => { io.on('connection', async socket => {
    socket.join( socket.username );
    
    m3.comunicador.ENVIAR_MENSAJE( socket );
})} 

module.exports = iniciador;