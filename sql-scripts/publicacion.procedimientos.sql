USE local_db;

drop procedure if exists post_pub_publicacion;
drop procedure if exists put_pub_publicacion;
drop procedure if exists put_pub_visible;
drop procedure if exists put_pub_fotos;
drop procedure if exists put_pub_fecha;
drop procedure if exists delete_pub_publicacion;
drop procedure if exists get_pub_publicacion;
drop procedure if exists get_pub_publicaciones;

DELIMITER $$
create procedure post_pub_publicacion( 
	autor int unsigned,
    titulo varchar(100),
    descripcion varchar(1000),
    tiempo tinyint unsigned,
    fotos varchar(361),
    precio float,
    categoria tinyint unsigned,
    tipo bool,
    negociable bool
) begin
	INSERT INTO PUBLICACION ( PUBLI_AUTOR, PUBLI_FECHA, PUBLI_LAST_REFRESH, PUBLI_TITULO, PUBLI_DESCRIPCION, PUBLI_TIEMPO, PUBLI_FOTOS, PUBLI_PRECIO, PUBLI_CATEGORIA, PUBLI_TIPO, PUBLI_NEGOCIABLE ) VALUES
    ( autor, sysdate(), sysdate(), titulo, descripcion, tiempo, fotos, precio, categoria, tipo, negociable );
end;

create procedure put_pub_publicacion( 
	id int unsigned ,
    titulo varchar(100),
    descripcion varchar(1000),
    precio float,
    categoria tinyint unsigned,
    negociable bool
) begin
	UPDATE PUBLICACION SET 
		PUBLI_TITULO 		= titulo, 
        PUBLI_DESCRIPCION 	= descripcion,
        PUBLI_PRECIO		= precio,
        PUBLI_CATEGORIA		= categoria,
        PUBLI_NEGOCIABLE	= negociable
	WHERE PUBLI_ID = id;
end;

create procedure put_pub_visible( id int unsigned ) begin
	IF( SELECT PUBLI_VISIBLE FROM PUBLICACION WHERE PUBLI_ID = id ) = 0 then 
		UPDATE PUBLICACION SET PUBLI_VISIBLE = 1 WHERE PUBLI_ID = id;
	else 
		UPDATE PUBLICACION SET PUBLI_VISIBLE = 0 WHERE PUBLI_ID = id; 
    end if;
end;

create procedure put_pub_fotos(id int unsigned, fotos varchar(361)) begin
	UPDATE PUBLICACION SET PUBLI_FOTOS = fotos WHERE PUBLI_ID = id;
end;

create procedure delete_pub_publicacion( id int unsigned ) begin
	UPDATE PUBLICACION SET PUBLI_ACTIVA = 0 WHERE PUBLI_ID = id;
end;

create procedure get_pub_publicacion(pub_id int unsigned) begin
	SELECT concat(USU_NOMBRE,' ',USU_APELLIDO1,' ',USU_APELLIDO2) AS PUBLI_AUTOR, USU_ID AS PUBLI_USUID, USU_CORREO AS PUBLI_EMAIL, PUBLI_FECHA, PUBLI_TITULO, PUBLI_TIEMPO, PUBLI_DESCRIPCION, PUBLI_PRECIO, PUBLI_FOTOS, CAT_NOMBRE AS PUBLI_CATEGORIA FROM PUBLICACION
    JOIN USUARIO ON USU_ID = PUBLI_AUTOR
    JOIN CATEGORIA ON PUBLI_CATEGORIA = CAT_ID
    WHERE PUBLI_ID = pub_id;
end;

create procedure get_pub_publicaciones(lmt_inf int, lmt_sup int) begin
	SELECT PUBLI_ID, concat(USU_NOMBRE,' ',USU_APELLIDO1,' ',USU_APELLIDO2) AS PUBLI_AUTOR, PUBLI_FECHA, PUBLI_TITULO, PUBLI_PRECIO, PUBLI_FOTOS FROM PUBLICACION
    JOIN USUARIO ON USU_ID = PUBLI_AUTOR
    JOIN CATEGORIA ON PUBLI_CATEGORIA = CAT_ID
    LIMIT lmt_inf, lmt_sup;
end;
$$
