use local_db;

drop procedure if exists get_idChat;
drop procedure if exists post_chat_chat;
drop procedure if exists post_interaccion_interaccion;

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
		INSERT INTO CHAT (CHAT_PUBLICACION, CHAT_ACTIVIDAD, CHAT_USUARIOS_ACTIVOS) VALUES (idPublicacion, NULL, 2);
        SELECT MAX(CHAT_ID) as idChat FROM CHAT;
    COMMIT;
end;
$$

DELIMITER $$
create procedure post_interaccion_interaccion(idChat int unsigned, idUsuario int unsigned) begin
	INSERT INTO INTERACCION VALUES (idChat, idUsuario, 1);
end;
$$

-- CALL get_idChat(1, 1);