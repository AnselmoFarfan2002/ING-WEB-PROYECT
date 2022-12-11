use local_db;

drop procedure if exists get_idChat;
drop procedure if exists post_chat_chat;
drop procedure if exists post_inte_interaccion;
drop procedure if exists put_inte_interaccion;
drop procedure if exists get_inte_interacciones;
drop procedure if exists get_inte_usuario;

DELIMITER $$
create procedure get_idChat(idPublicacion int unsigned, idUsuario int unsigned) begin
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
create procedure get_inte_usuario(idUsuarioNoDeseado int unsigned, idChat int unsigned) begin
	SELECT concat_ws(" ", USU_NOMBRE, USU_APELLIDO1, USU_APELLIDO2) AS contacto, USU_FOTO as foto, USU_CORREO AS correo FROM INTERACCION JOIN USUARIO ON USU_ID = INT_USUARIO WHERE idChat = INT_CHAT AND INT_USUARIO != idUsuarioNoDeseado;
end;
$$

call get_inte_usuario(2,31);

-- CALL get_idChat(1, 1);