USE local_db;

drop procedure if exists put_interaccion_notificacion;

DELIMITER $$
create procedure put_interaccion_notificacion(idUsuarioReceptor int unsigned, idChat int unsigned) begin
	UPDATE interaccion SET INT_NOTIFICACION = 1 WHERE INT_CHAT = idChat AND INT_USUARIO = idUsuarioReceptor;
end;
$$
