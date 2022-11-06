const controllers = {}

controllers.EDITAR_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){
        let query = 'call put_pub_publicacion(?,?,?,?,?,?,?,?,?,?)';

        query = mysqlConnection.format( query, [ 
            req.body.autor,
            req.body.titulo,
            req.body.descripcion,
            req.body.tiempo,
            req.body.fotos,
            req.body.precio,
            req.body.categoria,
            req.body.tipo,
            req.body.negociable
        ]);

        mysqlConnection.query( query, (err, rows) => {
            if( err ) 
                res.send({ 
                    status: -1, 
                    msg: 'Ha ocurrido un error al editar su publicación.' 
                });
            else
                res.send({ 
                    status: 1, 
                    msg: 'Se ha editado su publicación de forma exitosa.' 
                });
        })

    } else res.send( { msg: 'u need an open session to do that...', status: -1 } );
}

module.exports = controllers;