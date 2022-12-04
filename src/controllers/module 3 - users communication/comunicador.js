const mysqlConnection = require("../../config/db-connection");
const controllers = {}

controllers.CARGAR_COMUNICADOR = (req, res) => {
    if( req.session.open === true ){
        //creating sockets
        res.render('chat', { userId : req.session.userId });
    } 
    else res.redirect('/?login=false');
}

controllers.ENVIAR_MENSAJE = socket => {
    socket.on('client:message', mensaje => {
        socket.to( mensaje.to ).emit( 'server:message', {...mensaje} );
    });
}

module.exports = controllers;