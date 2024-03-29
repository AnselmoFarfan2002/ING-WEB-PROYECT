const mysqlConnection = require( '../../config/db-connection' );

const controllers = {};
const { INDEX_CARGO } = require('./registrador');

controllers.ACTUALIZAR_FOTO_PERFIL = (req, res) => {
    if( req.session.open !== true ) res.send( { msg: 'u must have an opened session', status: -1 } );
    else{
        mysqlConnection.query('call put_usu_photo(?,?)', [req.session.userId, 'photo-' + req.session.userId + '.png'] );
        res.redirect('/mi-perfil');
    } 
}

controllers.ACTUALIZAR_FOTO_EMPRESA = (req, res) => {
    if( req.session.open !== true ) res.send( { msg: 'u must have an opened session', status: -1 } );
    else {
        mysqlConnection.query('call put_emp_photo(?,?)', [req.session.empresa, 'photo-' + req.session.empresa + '.png'] );
        res.redirect('/mi-perfil');
    };
}

controllers.ACTUALIZAR_DATOS = (req, res) => {
    if( req.session.open === false ) res.send( { msg: 'u must have an opened session', status: -1 } );
    else if( req.session.email == req.body.correo ){
        INDEX_CARGO(req.body.cargo).then( idCargo => { mysqlConnection.query( 'call put_usu_usuario(?,?,?,?,?,?,?,?)', [
            req.body.nombre,
            req.body.apellido1,
            req.body.apellido2,
            idCargo,
            req.session.email,
            req.session.userId,
            req.body.celular,
            req.body.telefono
        ], ( err ) => {
            if( err ) {
                console.log(err);
                res.send({ msg: 'Lo sentimos, ha ocurrido un error durante la edición.', status: -1 });
            } else {
                req.session.email = req.body.correo;
                res.send({ msg: 'Sus datos han sido actualizados.', status: 1 });
            }
        })});
        
    } else res.send({ msg: "U don't have permission to do this", status: 0 });
}

controllers.ACTUALIZAR_CONTRASENIA = (req, res) => {
    if( req.session.open === false ) res.send( { msg: 'u must have an opened session', status: -1 } );
    else{
        mysqlConnection.query('SELECT validar_credenciales(?,?,?) as status', [ req.session.email, req.body["old-pass"], process.env.XLR8 ],
            (err, rows) => new Promise((resolve, reject) => {
                if ( err ) reject({ msg: 'Hubo un problema al actualizar la contraseña.', status: -1, error: err });
                else 
                    if( rows[0].status === 1 ) resolve({ msg: 'Se acepta la anterior contraseña.',  status: 1 });
                    else reject({ msg: 'La anterior contraseña parece ser incorrecta', status: -1 })
            })

            .then( data => new Promise((resolve, reject) => {
                mysqlConnection.query('call put_usu_contrasenia(?, ?, ?)', [req.session.userId, req.body["new-pass"], process.env.XLR8 ], (err) =>{
                    if ( err ) reject({ msg: 'Hubo un problema al actualizar la contraseña.', status: -1, error: err });
                    else resolve({ msg: 'Contraseña actualizada con éxito.', status: 1 });
                });
            }))

            .then( successful => res.send(successful) )
            .catch( failed => {
                res.send({ status: failed.status, msg: failed.msg})
                console.log( failed.error );
            })
        );
    }
}

module.exports = controllers;