const mysqlConnection = require("../../config/db-connection");

const controllers = {}

controllers.ELIMINAR_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){
        let query = mysqlConnection.format( 'call delete_pub_publicacion(?)', req.params.id );
        
        mysqlConnection.query(query, (err,rows) => new Promise((resolve, reject) => {
            if( err ) reject({ msg: 'Ha ocurrido un error al eliminar la publicación.', status: -1, error: err });
            else resolve({ msg: 'Se ha eliminado la publicación.', status: 1 });

        }).then( resultado => res.send( resultado ) )
        .catch( resultado => {
            res.send({ msg: resultado.msg, status: resultado.status });
            console.log( resultado.error );
        }))
        
    } else res.send( { msg: 'u need an open session to do that...', status: -1 } ); 
}

module.exports = controllers;