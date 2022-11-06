const mysqlConnection = require( '../../config/db-connection' );
const controllers = {};

controllers.REGISTRAR_CUENTA = (req, res) => {
    let query = mysqlConnection.format('select validar_registro(?,?) as status', [req.body.correo, req.body.ruc]);

    mysqlConnection.query(query, (err, rows, ifield)=>{
        let msg = ''; //Mensaje
        var i = 0; //Indice
        let validate = [
            /^\d{11}$/, //Patron para RUC
            /^[a-zA-ZÀ-ÿ\00f1\00d1]+(\s*[a-zA-ZÀ-ÿ\00f1\00d1]*)*[a-zA-ZÀ-ÿ\00f1\00d1]{2,30}$/, //Patron para entidad
            /^[a-zA-ZÀ-ÿ\00f1\00d1]+(\s*[a-zA-ZÀ-ÿ\00f1\00d1]*)*[a-zA-ZÀ-ÿ\00f1\00d1]{2,40}$/, //Patron para ubicacion
            /^[a-zA-ZÀ-ÿ\00f1\00d1]+(\s*[a-zA-ZÀ-ÿ\00f1\00d1]*)*[a-zA-ZÀ-ÿ\00f1\00d1]{2,20}$/, //Patron para rol de entidad

            /^[a-zA-ZÀ-ÿ\00f1\00d1]+(\s*[a-zA-ZÀ-ÿ\00f1\00d1]*)*[a-zA-ZÀ-ÿ\00f1\00d1]{2,30}$/, //Patron para nombre
            /^[a-zA-ZÀ-ÿ\00f1\00d1]+(\s*[a-zA-ZÀ-ÿ\00f1\00d1]*)*[a-zA-ZÀ-ÿ\00f1\00d1]{2,30}$/, //Patron para apellido paterno
            /^[a-zA-ZÀ-ÿ\00f1\00d1]+(\s*[a-zA-ZÀ-ÿ\00f1\00d1]*)*[a-zA-ZÀ-ÿ\00f1\00d1]{2,30}$/, //Patron para apellido materno

            /^[a-zA-ZÀ-ÿ\00f1\00d1]+(\s*[a-zA-ZÀ-ÿ\00f1\00d1]*)*[a-zA-ZÀ-ÿ\00f1\00d1]{4,20}$/, //Patron del cargo
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //Patron de correo 
            /^\d{9}$/, //Patron de celular
            /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/ //Patron de contraseña
        ];

        let register_data = [ //Datos del registro
            req.body.ruc,
            req.body.entidad,
            req.body.ubicacion,
            req.body.rol_entidad,
            req.body.nombre,
            req.body.apellido1,
            req.body.apellido2,
            req.body.cargo,
            req.body.correo,
            req.body.celular,
            req.body.contrasenia
        ]

        while(i < register_data.length){ //Bucle para verificar si los campos cumplen con las expresiones regulares
            if(validate[i].test(register_data[i])){ //Si el campo cumple con la expresion...
                i = i + 1;
            }else{
                rows[0].status = 0;
                i = register_data.length;
            }
        }

        switch(rows[0].status) {
            case -1: msg = 'Parece que el negocio ha sido registrado...'; break;
            case 0: msg = 'Ocurrio un error en los datos ingresados. Intentelo nuevamente.'; break;
            case 1: 
                mysqlConnection.query('call post_emp_empresa(?,?,?,?,?)',[ //Registra datos de la empresa
                    req.body.ruc,
                    req.body.entidad,
                    req.body.ubicacion,
                    req.body.rol_entidad,
                    req.body.emp_foto
                ]);

                mysqlConnection.query('call post_usu_usuario(?,?,?,?,?,?,?,?,?,?,?)',[ //Registra datos del usuario
                    req.body.nombre,
                    req.body.ruc,
                    req.body.apellido1,
                    req.body.apellido2,
                    req.body.cargo,
                    req.body.correo,
                    req.body.celular,
                    req.body.telefono,
                    req.body.contrasenia,
                    process.env.XLR8,
                    req.body.usu_foto
                ]);
                msg = 'Registro exitoso.';    
            break;
        };

        res.send({ status: rows[0].status, msg });
    });
};

module.exports = controllers;