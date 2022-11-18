const mysqlConnection = require( '../../config/db-connection' );
const controllers = {};

controllers.REGISTRAR_CUENTA = (req, res) => {
    let query = mysqlConnection.format('select validar_registro(?,?) as status', [req.body.correo, req.body.ruc]);
    
    mysqlConnection.query(query, (err, rows, ifield)=>{
        let msg = ''; //Mensaje

        switch(rows[0].status) {
            case -1: msg = 'La empresa como el correo de usuario ya han sido registrados.'; break;
            case  0: msg = 'El correo ya ha sido registrado'; break;
            case  1: 
                mysqlConnection.query('call post_emp_empresa(?,?,?,?,?)',[ //Registra datos de la empresa
                    req.body.ruc,
                    req.body.entidad,
                    req.body.ubicacion,
                    req.body.rol_entidad,
                    'defaultBusiness.jpg'
                ]);

                mysqlConnection.query('call post_car_cargo(?)',[req.body.cargo]); //Registra el cargo del usuario

                mysqlConnection.query('select get_car_id() as cargo',(err, rows)=>{
                    if(rows[0].cargo > 0){
                        mysqlConnection.query('call post_usu_usuario(?,?,?,?,?,?,?,?,?,?,?)',[ //Registra datos del usuario
                        req.body.nombre,
                        req.body.ruc,
                        req.body.apellido1,
                        req.body.apellido2,
                        rows[0].cargo,
                        req.body.correo,
                        req.body.celCod + ' ' + req.body.celular, // '+51' + ' ' + '123456789'
                        req.body.telefono,
                        req.body.contrasenia,
                        process.env.XLR8,
                        'defaultUser.jpg'
                    ]);
                    }
                });

                msg = 'Registro exitoso.';    
            break;
        };

        res.send({ status: rows[0].status, msg });
    });
};

module.exports = controllers;