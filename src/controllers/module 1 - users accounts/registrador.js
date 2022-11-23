const mysqlConnection = require( '../../config/db-connection' );
const controllers = {};

controllers.REGISTRAR_CUENTA = (req, res) => {
    let query = mysqlConnection.format('select validar_registro(?,?) as status', [req.body.correo, req.body.ruc]);
    
    mysqlConnection.query(query, (err, rows, ifield)=>{
        let msg = ''; //Mensaje

        switch(rows[0].status) {
            case -1: msg = 'La empresa ya ha sido registrada.'; break;
            case  0: msg = 'El correo ya ha sido registrado'; break;
            case  1: 
                mysqlConnection.query('call post_emp_empresa(?,?,?,?,?)',[ //Registra datos de la empresa
                    req.body.ruc,
                    req.body.entidad,
                    req.body.ubicacion,
                    req.body.rol_entidad,
                    'defaultBusiness.jpg'
                ]);

                mysqlConnection.query('call post_usu_usuario(?,?,?,?,?,?,?,?,?,?,?)',[ //Registra datos del usuario
                    req.body.nombre,
                    req.body.ruc,
                    req.body.apellido1,
                    req.body.apellido2,
                    req.body.cargo,
                    req.body.correo,
                    req.body.celCod + ' ' + req.body.celular, // '+51' + ' ' + '123456789'
                    req.body.telefono,
                    req.body.contrasenia,
                    process.env.XLR8,
                    'defaultUser.jpg'
                ]);

                msg = 'Registro exitoso.';    
            break;
        };

        res.send({ status: rows[0].status, msg });
    });
};

module.exports = controllers;