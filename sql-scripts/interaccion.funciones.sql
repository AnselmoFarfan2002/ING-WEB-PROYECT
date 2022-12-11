USE local_db;
-- SET GLOBAL log_bin_trust_function_creators = 1;

drop function if exists chatPolice;

DELIMITER $$ 
create function chatPolice( idUsuario int unsigned, idChat int unsigned ) returns bool begin
	return (SELECT COUNT(INT_CHAT) FROM INTERACCION WHERE INT_USUARIO = idUsuario AND INT_CHAT = idChat) > 0;
end; $$

select chatPolice(4,31)