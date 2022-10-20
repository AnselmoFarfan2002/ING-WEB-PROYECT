const mysqlConnection = require( '../../config/db-connection' );
const controllers = {};

controllers.INICIAR_SESION = (req, res) => {
    if( req.session.open ) res.send( { msg: 'ur session is already open' } );
    
    let query;
    query = mysqlConnection.format( 'SELECT validar_credenciales(?,?,?) as status', [req.body.email, req.body.pass, process.env.XRL8] );

    mysqlConnection.query( query, (err, rows, ifield) => {
        let msg = '';

        switch( rows[0].status ) {
            case -1: msg = 'Usuario no registrado.'; break;
            case  0: msg = 'Contraseña incorrecta.'; break;
            case  1: res.session.open = true; break;
        }
        
        res.send({ status: rows[0].status, msg });
    });
}


module.exports = controllers;