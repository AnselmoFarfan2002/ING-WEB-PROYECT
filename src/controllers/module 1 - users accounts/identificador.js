const mysqlConnection = require( '../../config/db-connection' );
const postman = require ( '../../config/email-postman' );

const controllers = {};

controllers.INICIAR_SESION = (req, res) => {
    if( req.session.open === true ) res.send( { msg: 'ur session is already open' } );
    else {
        let query;
        console.log(req.body);
        query = mysqlConnection.format( 'SELECT validar_credenciales(?,?,?) as status', [req.body.email, req.body.pass, process.env.XLR8] );

        mysqlConnection.query( query, (err, rows) => new Promise((resolve, reject) => {
            let msg = '';
            
            switch( rows[0].status ) {
                case -1: msg = 'Usuario no registrado.'; reject({ msg, stauts: -1 }); break;
                case  0: msg = 'Contraseña incorrecta.'; reject({ msg, stauts:  0 }); break;
                case  1: 
                    msg = 'ur session has already been opened'; 
                    mysqlConnection.query('SELECT USU_ID, USU_EMPRESA FROM USUARIO WHERE USU_CORREO = ?', req.body.email, 
                        (err, rows) => new Promise((resolve, reject) => {
                            
                            if( err ) reject( err );
                            else resolve( rows );
                        }).then( data => {
                            req.session.open = true;
                            req.session.email = req.body.email;
                            req.session.userId = data[0].USU_ID;
                            req.session.empresa = data[0].USU_EMPRESA;
                            
                            resolve({ msg, stauts: 1 });
                        }).catch( err => console.log(err) )
                    );
                break;
            } 

        })
        .then( msg => res.send( msg ) )
        .catch( msg => res.send( msg ) ))
    }
}

controllers.CERRAR_SESION = (req, res) => {
    if( req.session.open === true ){
        req.session.destroy();
        res.send({ status: 1, msg: 'ur session is closed' });

    } else res.send({ status: -1, msg: `no session open` });  
}

controllers.RECUPERAR_CONTRASENIA = (req, res) => {
    let contentHTML;
    
    mysqlConnection.query('call get_usu_contrasenia(?, ?)', [req.query.email, process.env.XLR8], (err, rows) => {
        if( rows[0].length === 0 ) res.send({status: -1});
        else {
            contentHTML = `
                <div style="width: 316px; height: 330px; background-color: #F6F6F6; border-color: #BEDCDF; border-width: 2px; border-style: solid;">
                    <div style="padding-top: 24px">
                        <p style="font-size: 24pt; margin: 0px; font-weight: bold; text-align: center; color: #30818A;">@ SOPORTE @</p>
                    </div>

                    <img src="https://www.nicepng.com/png/detail/404-4041054_ventas-png-funciones-de-las-ventas.png" style="height: 81px; width: 145px; padding-top: 16pt; padding-left: 86px;"> 

                    <div style="margin-top: 21px; margin-left: 40px; width: 237px; height: 33px; background-color: #BEDCDF; border-radius: 10px; text-align: center; padding-top: 15px;">
                        <b style="color: #30818A">Su contraseña es...</b>
                    </div>

                    <div style="margin-top: 15px; margin-left: 40px; width: 237px; height: 33px; background-color: #BEDCDF; border-radius: 10px; text-align: center; padding-top: 15px;">
                        <b style="color: #30818A">${rows[0][0].pass}</b>
                    </div>
                </div>
            `;

            postman.sendMail({
                from: "'Soporte app god' <soporte@takanasoft.tacna.shop>",
                to: req.query.email,
                subject: 'Olvide mi contraseña',
                html: contentHTML
            });

            res.send({status: 1});
        }
    });
}

module.exports = controllers;