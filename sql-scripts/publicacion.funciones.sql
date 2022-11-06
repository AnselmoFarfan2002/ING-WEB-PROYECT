USE local_db;
-- SET GLOBAL log_bin_trust_function_creators = 1;

drop function if exists refrescador_publicaciones;

DELIMITER $$ 

create function refrescador_publicaciones( id int unsigned ) returns tinyint begin
	--  1: succesful
    -- -1: not enough days
	if DATEDIFF(sysdate(), (SELECT PUBLI_LAST_REFRESH FROM PUBLICACION WHERE PUBLI_ID = id)) >= 7 then
		UPDATE PUBLICACION SET PUBLI_LAST_REFRESH = sysdate() WHERE PUBLI_ID = id;
        return 1;
	else
		return -1;
	end if;
end;

$$