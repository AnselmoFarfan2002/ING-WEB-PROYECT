const mysqlConnection = require("../../config/db-connection");

const controllers = {}

controllers.CREAR_PUBLICACION = (req, res) => {
    console.log()
    if ( req.session.open === true ){
        let query = 'call post_pub_publicacion(?,?,?,?,?,?,?,?,?,?)';

        console.log(req.body)
        console.log(req.files)

        // query = mysqlConnection.format( query, [ 
        //     req.body.autor,
        //     req.body.titulo,
        //     req.body.descripcion,
        //     req.body.tiempo,
        //     req.body.fotos,
        //     req.body.precio,
        //     req.body.categoria,
        //     req.body.tipo,
        //     req.body.negociable
        // ]);

        // mysqlConnection.query( query, (err, rows) => {
        //     if( err ) 
        //         res.send({ 
        //             status: -1, 
        //             msg: 'Ha ocurrido un error en la publicación.' 
        //         });
        //     else
        //         res.send({ 
        //             status: 1, 
        //             msg: 'Publicación exitosa.' 
        //         });
        // })

        res.send( req.body ); 

    } else res.send( { msg: 'u need an open session to do that...', status: -1 } ); 
}

module.exports = controllers;