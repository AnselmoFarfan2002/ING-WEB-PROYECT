const mysqlConnection = require( '../../config/db-connection' );
const controllers = {};

controllers.OBTENER_DATOS_PUBLICACION = (req, res) => {
    if( req.query.id ){
        console.log('asd')
        mysqlConnection.query('call get_pub_publicacion(?)', req.query.id, (err, rows) => {
            if( err ) {
                console.log(err); 
            }
            else res.send({...rows[0][0]})
        });
    } else controllers.LISTAR_PUBLICACION(req, res);
}

controllers.LISTAR_PUBLICACION = (req, res) => { 
    let i = req.query.i;
    let n = req.query.n;

    if(isNaN(i) || isNaN(n)){
        mysqlConnection.query('SELECT count(PUBLI_ID) as total FROM PUBLICACION', (err, rows) => {
            mysqlConnection.query('call get_pub_publicaciones(?,?)',[0,rows[0].total], (err, rows) => {
                if( err ) console.log(err);
                else {
                    res.send({...rows[0]})
                }
            });
        });
    }else{
        mysqlConnection.query('call get_pub_publicaciones(?,?)',[i,n], (err, rows) => {
            if( err ) console.log(err);
            else {
                res.send({...rows[0]})
            }
        });
    }
}

module.exports = controllers;