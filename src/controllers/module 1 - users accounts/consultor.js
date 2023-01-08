const mysqlConnection = require( '../../config/db-connection' );
const controllers = {};

controllers.OBTENER_DATOS = (req, res) => {
    if( req.session.open === true ){
        mysqlConnection.query('call get_usu_usuario(?)', req.session.userId, (err, rows) => {
            if( err ) console.log(err);
            else res.send({...rows[0][0]})
        });
    } else res.send({ msg: 'Necesita una iniciar sesión para visualizar su propio perfil.', status: -1 })
}

controllers.OBTENER_CARGOS = (req, res) => {
    mysqlConnection.query('SELECT CAR_NOMBRE as cargo FROM CARGO', (err, rows) => {
        if( err ) console.log(err);
        else res.send(rows)
    });
}

module.exports = controllers;