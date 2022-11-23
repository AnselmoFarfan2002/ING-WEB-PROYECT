const { json } = require("express");
const mysqlConnection = require("../../config/db-connection");

const controllers = {}

controllers.CREAR_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){
        let query = 'call post_pub_publicacion(?,?,?,?,?,?,?,?,?)';

        //req.body.fotos = [];
        //req.files.forEach(element => { req.body.fotos.push(element.filename) });
        req.body.fotos = JSON.stringify( req.body.fotos );

        query = mysqlConnection.format( query, [ 
            req.session.userId,
            req.body.titulo,
            req.body.descripcion,
            req.body.tiempo,
            req.body.fotos,
            req.body.precio,
            req.body.categoria,
            req.body.tipo,
            req.body.negociable
        ]);

        mysqlConnection.query( query, (err, rows) => new Promise((resolve, reject) => {
            if( err ) 
                reject({ 
                    msg: 'Ha ocurrido un error en la publicación.',
                    status: -1,                     
                    error: err
                });
            else
                resolve({ 
                    msg: 'Publicación exitosa.',
                    status: 1
                });
        })

        .then( msg => res.send( msg ) )
        .catch( msg => {
            res.send({ msg: msg.msg, status: msg.status });
            console.log( msg.error );
        }))

    } else res.send( { msg: 'u need an open session to do that...', status: -1 } ); 
}

module.exports = controllers;