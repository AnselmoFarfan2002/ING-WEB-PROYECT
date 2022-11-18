const mysqlConnection = require("../../config/db-connection");

const controllers = {}

controllers.EDITAR_DATOS_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){
        let query = mysqlConnection.format( 'call put_pub_publicacion(?,?,?,?,?,?)', [
            req.params.id,
            req.body.titulo,
            req.body.descripcion,
            req.body.precio,
            req.body.categoria,
            req.body.negociable
        ]);

        mysqlConnection.query(query, (err,rows) => new Promise((resolve, reject) => {
            if( err ) reject({ msg: 'Ha ocurrido un error al editar la publicación.', status: -1, error: err });
            else resolve({ msg: 'Edición exitosa.', status: 1 });

        }).then( resultado => res.send( resultado ) )
        .catch( resultado => {
            res.send({ msg: resultado.msg, status: resultado.status });
            console.log( resultado.error );
        }))
        
    } else res.send( { msg: 'u need an open session to do that...', status: -1 } ); 
}

controllers.ALTERNAR_VISIBILIDAD_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){
        let query = mysqlConnection.format( 'call put_pub_visible(?)', req.params.id );
        mysqlConnection.query(query, (err,rows) => new Promise((resolve, reject) => {
            if( err ) reject({ msg: 'Ha ocurrido un error al ocultar la publicación.', status: -1, error: err });
            else resolve({ msg: 'Se ha cambiado la visibilidad de su publicación.', status: 1 });

        }).then( resultado => res.send( resultado ) )
        .catch( resultado => {
            res.send({ msg: resultado.msg, status: resultado.status });
            console.log( resultado.error );
        }))
        
    } else res.send( { msg: 'u need an open session to do that...', status: -1 } ); 
}

controllers.ACTUALIZAR_FOTOS_PUBLICACION = (req, res) => {

}

module.exports = controllers;