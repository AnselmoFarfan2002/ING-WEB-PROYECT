const fs = require('fs');
const mysqlConnection = require("../../config/db-connection");
const controllers = {}

controllers.CARGAR_CHATS_DE_USUARIO = (req, res) => {
    if(req.session.open === true){
        let msgErr = {msg: 'Ha ocurrido un error en su solicitud', status: -1};
        mysqlConnection.query('call get_inte_interacciones(?)', req.session.userId, (err, rows) => new Promise((resolve, reject) => {
            if(err) reject({msgErr, err});
            else resolve(rows[0]);
        }).then( filas => new Promise((resolve, reject) => {
            filas = [...filas];
            let it = 0;
            filas.forEach( (e,i) => {
                fs.readFile('./chats/' + e.idChat + '.txt', (err, chat) => {
                    if(err) reject({msgErr, err});
                    else {
                        chat = JSON.parse(chat);
                        e.fotos = JSON.parse(e.fotos)[0];
                        
                        mysqlConnection.query('call get_inte_usuario(?,?)', [req.session.userId, e.idChat], (err, rows) => new Promise((resolve, reject) => {
                            if(err) reject({msgErr, err});
                            else {
                                filas[i] = {
                                    ...e, 
                                    ultimoMensaje: chat.mensajes[chat.length - 1], 
                                    contacto: {
                                        foto: rows[0][0].foto,
                                        nombre: rows[0][0].contacto,
                                        correo: rows[0][0].correo
                                    }
                                }

                                it++; if(it == filas.length) resolve(filas);
                            };
                        }).catch( error => reject(error) )
                        .then( filas => resolve(filas)));
                    }
                })
            });
        }))
        .then( data => res.send({chats: data, status: 1}) )
        .catch( error => {
            res.send(error.msgErr);
            console.log(error.err);
        }))
    }else res.send({msg: 'None session open', status: -1})
}

controllers.DAR_INFO_USUARIO = (req,res) => {
    mysqlConnection.query('call get_inte_usuario(?,?)', [req.session.userId, req.params.idChat], (err, rows) => {
        if(err) reject({msgErr, err});
        else {
            if( err ) console.log(err);
            else {res.send({datos: rows[0][0]})}
        };
    });
}

controllers.DAR_CHAT = (req, res) => {
    if(req.session.open === true){
        mysqlConnection.query('SELECT chatPolice(?,?) as acceso', [req.session.userId, req.params.idChat], (err, rows) => {
            if(err) res.send({msg: 'Ha ocurrido un error en su solicitud', status: -1})
            else {
                if(rows[0].acceso) {
                    fs.readFile('./chats/' + req.params.idChat + '.txt', (err, chat) => {
                        if(err) res.send({msg: 'Ha ocurrido un error en su solicitud', status: -1})
                        else res.send({chat: JSON.parse(chat), status: 1})
                    });
                } else res.send({msg: '¿?', status: -1});
            }
        })        
    } else res.send({msg: 'None session open', status: -1})
}

module.exports = controllers;