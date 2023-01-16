const mysqlConnection = require("../../config/db-connection");

const controllers = {}

controllers.REFRESCAR_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){
        let query = mysqlConnection.format( 'select refrescador_publicaciones(?) as status', req.params.id );

        mysqlConnection.query(query, (err,rows) => new Promise((resolve, reject) => {
            if( err ) reject({ msg: 'Ha ocurrido un error al refrescar la publicación.', status: -1, error: err });
            else 
                if( rows[0].status == 1 ) resolve({ msg: 'Se ha refrescado la publicación, ahora se verá entre las más recientes.', status: 1 });
                else reject({ msg: 'Aún no ha pasado 7 días desde tu último refresco.', status: -1, error: err });

        }).then( resultado => res.send( resultado ) )
        .catch( resultado => {
            res.send({ msg: resultado.msg, status: resultado.status });
            console.log( resultado.error );
        }))
        
    } else res.send( { msg: 'u need an open session to do that...', status: -1 } ); 
}

module.exports = controllers;