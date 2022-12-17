const mysqlConnection = require( '../../config/db-connection' );
const request = require('request');
const controllers = {};

const validarCaptcha = (req) => new Promise((resolve, reject) => {   
    request(`https://www.google.com/recaptcha/api/siteverify?
        secret=${process.env.XLR7}
        &response=${req.body['g-recaptcha-response']}
        &remoteip=${req.connection.remoteAddress}`, 
    (err, res, body) => {
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success) reject(err);
        else resolve();
    });
})

controllers.REGISTRAR_CUENTA = (req, res) => {
    validarCaptcha(req)
    .then(() => {
        let query = mysqlConnection.format('select validar_registro(?,?) as status', [req.body.correo, req.body.ruc]);
    
        mysqlConnection.query(query, (err, rows, ifield)=>{
            let msg = ''; //Mensaje

            switch(rows[0].status) {
                case -1: msg = 'La empresa ya ha sido registrada.'; break;
                case  0: msg = 'El correo ya ha sido registrado'; break;
                case  1: 
                    mysqlConnection.query('SELECT CAR_NOMBRE FROM CARGO', (err, rows) => new Promise((resolve, reject) => {
                        let cargo = rows.indexOf(req.body.cargo);
                        if(cargo === -1) {
                            mysqlConnection.query('call post_car_cargo(?,?)', [rows.length + 1, req.body.cargo], (err) => {
                                if(err) console.log(err)
                                else resolve(rows.length + 1);
                            })
                        } else resolve(cargo + 1);
                    }).then( idCargo => {
                        mysqlConnection.query('call post_emp_empresa(?,?,?,?,?)',[ //Registra datos de la empresa
                            req.body.ruc,
                            req.body.entidad,
                            req.body.ubicacion,
                            req.body.rol_entidad,
                            'defaultBusiness.jpg'
                        ], err => new Promise((resolve, reject) => {
                            if(err) reject(err);
                            else resolve();
                        }).then( () => {     
                            mysqlConnection.query('call post_usu_usuario(?,?,?,?,?,?,?,?,?,?,?)',[ //Registra datos del usuario
                                req.body.nombre,
                                req.body.ruc,
                                req.body.apellido1,
                                req.body.apellido2,
                                idCargo,
                                req.body.correo,
                                req.body.celCod + ' ' + req.body.celular, // '+51' + ' ' + '123456789'
                                req.body.telefono,
                                req.body.contrasenia,
                                process.env.XLR8,
                                'defaultUser.jpg'
                            ]);
                        }).catch( err => console.log(err) ));
                    }));

                    msg = 'Registro exitoso.';    
                break;
            };

            res.send({ status: rows[0].status, msg });
        });
    })
    .catch(() => {res.send({msg: 'Prueba de captcha fallida', status: -1})})
};

module.exports = controllers;