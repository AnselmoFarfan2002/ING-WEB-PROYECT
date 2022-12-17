use local_db;

drop procedure if exists get_inte_idChat;
drop procedure if exists post_chat_chat;
drop procedure if exists post_inte_interaccion;
drop procedure if exists put_inte_interaccion;
drop procedure if exists get_inte_interacciones;
drop procedure if exists get_inte_interaccion;
drop procedure if exists get_inte_usuario;
drop procedure if exists put_inte_notificacion_true;
drop procedure if exists put_inte_notificacion_false;
drop procedure if exists put_inte_visible;

DELIMITER $$
create procedure get_inte_idChat(idPublicacion int unsigned, idUsuario int unsigned) begin
	SELECT INT_CHAT AS idChat FROM INTERACCION 
		WHERE INT_CHAT IN (SELECT CHAT_ID FROM CHAT WHERE CHAT_PUBLICACION = idPublicacion) 
        AND INT_USUARIO = idUsuario;
end;
$$

DELIMITER $$
create procedure post_chat_chat(idPublicacion int unsigned) begin
	SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    START TRANSACTION;
		INSERT INTO CHAT (CHAT_PUBLICACION, CHAT_ULTIMA_ACTIVIDAD, CHAT_USUARIOS_ACTIVOS) VALUES (idPublicacion, NULL, 2);
        SELECT MAX(CHAT_ID) as idChat FROM CHAT;
    COMMIT;
end;
$$

DELIMITER $$
create procedure post_inte_interaccion(idChat int unsigned, idUsuario int unsigned, notificacion bool) begin
	INSERT INTO INTERACCION VALUES (idChat, idUsuario, 1, notificacion);
    UPDATE CHAT SET CHAT_ULTIMA_ACTIVIDAD = now() WHERE CHAT_ID = idChat;
end;
$$

DELIMITER $$
create procedure put_inte_interaccion(idUsuarioReceptor int unsigned, idChat int unsigned) begin
	UPDATE interaccion SET INT_NOTIFICACION = 1 WHERE INT_CHAT = idChat AND INT_USUARIO = idUsuarioReceptor;
end;
$$

DELIMITER $$
create procedure get_inte_interacciones(idUsuario int unsigned) begin
	SELECT INT_CHAT AS idChat, INT_NOTIFICACION AS notificacion, CHAT_PUBLICACION AS idPublicacion, PUBLI_TITULO AS titulo, PUBLI_FOTOS AS fotos, CHAT_ULTIMA_ACTIVIDAD AS ultimaActividad 
    FROM INTERACCION JOIN CHAT ON CHAT_ID = INT_CHAT JOIN PUBLICACION ON PUBLI_ID = CHAT_PUBLICACION
    WHERE (INT_VISIBLE = 1 OR INT_NOTIFICACION = 1) AND INT_USUARIO = idUsuario
    ORDER BY CHAT_ULTIMA_ACTIVIDAD DESC;
end; $$

DELIMITER $$
create procedure get_inte_interaccion(idUsuario int unsigned, idChat int unsigned) begin
	SELECT INT_CHAT AS idChat, INT_NOTIFICACION AS notificacion, CHAT_PUBLICACION AS idPublicacion, PUBLI_TITULO AS titulo, PUBLI_FOTOS AS fotos, CHAT_ULTIMA_ACTIVIDAD AS ultimaActividad, PUBLI_TIPO AS origenTipo, PUBLI_AUTOR AS idAutor
    FROM INTERACCION JOIN CHAT ON CHAT_ID = INT_CHAT JOIN PUBLICACION ON PUBLI_ID = CHAT_PUBLICACION
    WHERE (INT_VISIBLE = 1 OR INT_NOTIFICACION = 1) AND INT_USUARIO = idUsuario AND INT_CHAT = idChat
    ORDER BY CHAT_ULTIMA_ACTIVIDAD DESC;
end; $$

DELIMITER $$
create procedure get_inte_usuario(idUsuarioNoDeseado int unsigned, idChat int unsigned) begin
	SELECT concat_ws(" ", USU_NOMBRE, USU_APELLIDO1, USU_APELLIDO2) AS contacto, USU_FOTO as foto, USU_CORREO AS correo FROM INTERACCION JOIN USUARIO ON USU_ID = INT_USUARIO WHERE idChat = INT_CHAT AND INT_USUARIO != idUsuarioNoDeseado;
end;
$$

DELIMITER $$
create procedure put_inte_notificacion_true(idUsuarioEmisor int unsigned, idChat int unsigned) begin
	UPDATE INTERACCION SET INT_NOTIFICACION = true WHERE INT_CHAT = idChat AND INT_USUARIO != idUsuarioEmisor;
end;
$$

DELIMITER $$
create procedure put_inte_notificacion_false(idUsuarioObjetivo int unsigned, idChat int unsigned) begin
	UPDATE INTERACCION SET INT_NOTIFICACION = false WHERE INT_CHAT = idChat AND INT_USUARIO = idUsuarioObjetivo;
end;
$$

DELIMITER $$ 
create procedure put_inte_visible(idUsuario int unsigned, idChat int unsigned, estado boolean) begin
	UPDATE INTERACCION SET INT_VISIBLE = estado WHERE INT_CHAT = idChat AND INT_USUARIO = idUsuario;
    UPDATE CHAT SET CHAT_USUARIOS_ACTIVOS = 1 + estado WHERE CHAT_ID = idChat;
end;
$$
