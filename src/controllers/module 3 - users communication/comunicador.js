const mysqlConnection = require("../../config/db-connection");
const controllers = {}

controllers.CARGAR_COMUNICADOR = (req, res) => {
    if( req.session.open === true ){
        //creating sockets
        res.render('chat', { userId : req.session.userId });

    } else res.redirect('/?login=false');
}

controllers.ENVIAR_MENSAJE = socket => {
    socket.on('client:message', mensaje => {
        socket.to( mensaje.to ).emit( 'server:message', {...mensaje} );
    });
}

controllers.LANZAR_CHAT = (req, res) => {
    if( req.session.open === true ){
        mysqlConnection.query('call get_idChat(?, ?)', [req.idPublicacion, req.idUsuario], (err, rows) => new Promise((resolve, reject) => {
            if(err) reject({
                msg:'Ha ocurrido un error, por favor inténtelo más tarde.', 
                status: -1,
                error: err
            }); else resolve({
                idChat: rows[0]
            })
            
            console.log(rows[0])
        }));
    } else res.send({msg: 'Es necesaria una sesión para hacer eso.', status: -1});
}

module.exports = controllers;