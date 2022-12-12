const fs = require('fs');
const mysqlConnection = require("../../config/db-connection");
const controllers = {}

controllers.CARGAR_COMUNICADOR = (req, res) => {
    if( req.session.open === true ){
        //creating sockets
        res.render('mis-conversaciones', { session: req.session.open, userId : req.session.userId });
    } 
    else res.redirect('/?login=false');
}

controllers.GUARDAR_MENSAJE = (idChat, mensaje) => new Promise((resolve, reject) => {
    msgErr = {msg: 'Ha ocurrido un error, por favor inténtelo más tarde.', status: -1};
    fs.readFile(`./chats/${idChat}.txt`, (err, chat) => {
        if(err) reject({msgErr, error: err})
        else {
            chat = JSON.parse(chat.toString());
            chat.mensajes.push({
                ...mensaje,
                fecha: (new Date())
            });

            chat.length ++;

            fs.writeFile('./chats/' + idChat + '.txt', JSON.stringify( chat ), (err) => {
                if( err ) reject({ msgErr, error: err });
                else resolve();
            });
        }
    });
});

controllers.ENVIAR_MENSAJE = (socket, reqBody) => { if(reqBody) {
    controllers.GUARDAR_MENSAJE(reqBody.idChat, {
        emisor: reqBody.emisor.id,
        contenido: reqBody.contenido,
        multimedia: reqBody.multimedia
    }).then( () => {
        if(reqBody.needLaunch) {
            mysqlConnection.query('call get_inte_interaccion(?,?)',[reqBody.emisor.id, reqBody.idChat], (err, rows) => {
                rows[0][0].fotos = JSON.parse(rows[0][0].fotos)[0];

                socket.to( reqBody.emailUsuarioReceptor ).emit( 'server:launch:chat', {
                    contacto: reqBody.emisor,
                    ...rows[0][0]
                });

                socket.to( reqBody.emailUsuarioReceptor ).emit( 'server:message', {
                    idChat: reqBody.idChat,
                    contenido: reqBody.contenido,
                    multimedia: reqBody.multimedia,
                    fecha: (new Date())
                });
            });
        } else {
            socket.to( reqBody.emailUsuarioReceptor ).emit( 'server:message', {
                idChat: reqBody.idChat,
                contenido: reqBody.contenido,
                multimedia: reqBody.multimedia,
                fecha: (new Date())
            });
        }

        return {msg: 'Mensaje enviado', status: 1}
    }).catch( err => {
        console.log(err.error, err);
        return err.msgErr;
    });
} else {
    socket.on('client:message', mensaje => {
        controllers.GUARDAR_MENSAJE(mensaje.idChat, {
            emisor: mensaje.idEmisor,
            contenido: mensaje.contenido,
            multimedia: mensaje.multimedia
        }).then( () => {
            mysqlConnection.query('call put_inte_notificacion_true(?,?)', [mensaje.idEmisor, mensaje.idChat]);
            socket.to( mensaje.emailUsuarioReceptor ).emit( 'server:message', {
                idChat: mensaje.idChat,
                contenido: mensaje.contenido,
                multimedia: mensaje.multimedia,
                fecha: (new Date())
            });
        }).catch( error => {console.log(error)} );  
    });
}}

controllers.LANZAR_CHAT = (req, res) => {
    if( req.session.open === true ){
        let msgErr = {msg: 'Ha ocurrido un error, por favor inténtelo más tarde.', status: -1};
        
        mysqlConnection.query('call get_inte_idChat(?, ?)', [req.body.idPublicacion, req.body.emisor.id], 
            (err, rows) => new Promise((resolve, reject) => {
                if(err) reject({msgErr, error: err});
                else resolve(rows[0]); 
                
            }).then( filas => new Promise((resolve, reject) => {
                if(filas.length == 0) { 
                    mysqlConnection.query('call post_chat_chat(?)', req.body.idPublicacion, (err, rows) => new Promise((resolve, reject) => {
                        if(err) reject({msgErr, error: err});
                        else resolve(rows[0][0].idChat);

                    }).then( idChat => new Promise((resolve, reject) =>  {
                        mysqlConnection.query('call post_inte_interaccion(?,?,?)', [idChat, req.body.emisor.id, false], err => {if(err) reject({msgErr, error: err});});
                        mysqlConnection.query('call post_inte_interaccion(?,?,?)', [idChat, req.body.idUsuarioReceptor, true], err => {if(err) reject({msgErr, error: err});});

                        fs.appendFile(`./chats/${idChat}.txt`, JSON.stringify({mensajes: [], length: 0}), (err) => {
                            if (err) reject({msgErr, error: err});
                            else resolve(idChat);
                        });
                    })).then( idChat => {
                        req.body.emisor.nombre = `${req.body.emisor.nombre} ${req.body.emisor.apellido1} ${req.body.emisor.apellido2}`
                        respuesta = controllers.ENVIAR_MENSAJE(require('../../app'), {
                            idChat,
                            needLaunch: true,
                            ...req.body
                        })
                        resolve(respuesta);

                    }).catch( err => {
                        res.send(err.msgErr);
                        console.log(err.error, err);
                    }))
                } else {
                    respuesta = controllers.ENVIAR_MENSAJE(require('../../app'), {
                        idChat: filas[0].idChat,
                        needLaunch: false,
                        ...req.body
                    })
                    resolve(respuesta);
                }
            })).then( respuesta => res.send(respuesta) )
            .catch( err => {
                res.send(err.msgErr);
                console.log(err.error);
            })
        );
    } else res.send({msg: 'Es necesaria una sesión para hacer eso.', status: -1});
}

module.exports = controllers;