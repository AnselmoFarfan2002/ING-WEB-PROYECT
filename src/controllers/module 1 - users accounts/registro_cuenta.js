const mysqlConnection = require( '../../config/db-connection' );
const controllers = {};

controllers.REGISTRAR_CUENTA = (req, res) => {
    let query = mysqlConnection.format('select validar_registro(?,?) as status', [req.body.correo, req.body.ruc]);
    mysqlConnection.query(query, (err, rows, ifield)=>{
        let msg = '';

        switch(rows[0].status) {
            case -1: msg = 'No se logró realizar el registro de la cuenta.'; break;
            case  1: 
                mysqlConnection.query('call post_usu_usuario(?,?,?,?,?,?,?,?,?,?,?)',
                    [
                        req.body.ruc,
                        req.body.entidad,
                        req.body.ubicacion,
                        req.body.rol_entidad,
                        req.body.nombre,
                        req.body.rol_persona,
                        req.body.correo,
                        req.body.celular,
                        req.body.telefono,
                        req.body.contrasenia,
                        req.body.keyword
                    ]);
                msg = 'Registro exitoso.';     
            break;
        };
        res.send({ status: rows[0].status, msg });
    });
};

module.exports = controllers;