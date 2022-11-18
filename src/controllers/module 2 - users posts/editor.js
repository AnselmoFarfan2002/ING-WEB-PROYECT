const { json } = require("express");
const mysqlConnection = require("../../config/db-connection");
const fs = require("fs");
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
    if ( req.session.open === true ){        
        let newFotos = req.body.fotos;

        req.files.forEach( e => { newFotos.push( e.filename ) } ); //Se inserta los nombres de las nuevas fotos
        let query = mysqlConnection.format('call put_pub_fotos(?,?)', [req.params.id, JSON.stringify( newFotos )]);

        mysqlConnection.query("SELECT PUBLI_FOTOS FROM PUBLICACION WHERE PUBLI_ID = ?", req.params.id, (err,rows) => {
            let oldFotos = JSON.parse(rows[0].PUBLI_FOTOS); // Convierte a array

            for( let i = 0; i < oldFotos.length; i++ )
                if( newFotos.indexOf( oldFotos[i] ) == -1 ) 
                    fs.unlink(`public/images/posts-photos/${oldFotos[i]}`, err => {if (err) console.log(err)} );
            
            mysqlConnection.query(query, (err,rows) => new Promise((resolve, reject) => {
            //Se llama al query que actualiza el nombre de fotos en la BD
                if(err) reject({ msg: 'Ha ocurrido un error al editar las fotos.', status: -1, error: err }); //En caso de error
                else resolve({ msg: 'Edición exitosa.', status: 1 }); //Se realiza la edicion
            })

            .then( resp => res.send(resp) )
            .catch( resp => {
                res.send({ msg: resp.msg, status: resp.status });
                console.log( resp.error );
            }))
        });

    } else res.send( { msg: 'No se ha iniciado sesion...', status: -1 } ); 
}

module.exports = controllers;