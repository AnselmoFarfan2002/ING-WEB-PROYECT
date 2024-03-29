const mysqlConnection = require("../../config/db-connection");

const controllers = {};

controllers.toogleChat = (idUser, idChat, visible) => new Promise((resolve, reject) => {
    mysqlConnection.query('call put_inte_visible(?,?,?)', [idUser, idChat, visible], (err) => {
        if(err) reject({msg: {msg: 'Ha ocurrido un error al desenlistar el chat.', status: -1}, err});
        else resolve({msg: 'Chat desenlistado.', status: 1});
    })
})

controllers.OCULTAR_CHAT = (req, res) => {
    if(req.session.open === true){
        controllers.toogleChat(req.session.userId, req.params.idChat, req.params.visible)
        .then( msg => res.send(msg) )
        .catch( error => {
            res.send(error.msg);
            console.log(error.err);
        });
    } else res.send({msg: 'None session open', status: -1});
}

controllers.ACTUALIZAR_ACTIVIDAD = (req, res) => {
    if(req.session.open === true){
        let qry = "UPDATE chat SET CHAT_ULTIMA_ACTIVIDAD = ? WHERE CHAT_ID = ?";

        mysqlConnection.query(qry, [new Date(), req.params.idChat], (err, rows) => {
            console.log(rows);
        })
    } else res.send({msg: 'None session open', status: -1});
}

module.exports = controllers;