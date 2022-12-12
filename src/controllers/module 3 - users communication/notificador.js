const mysqlConnection = require("../../config/db-connection");
const controllers = {}

controllers.MARCAR_COMO_LEIDO = socket => {
    socket.on('client:notification:check', req => {
        mysqlConnection.query('call put_inte_notificacion_false(?,?)', [req.idUsuario, req.idChat]);
    })
}

module.exports = controllers;