USE local_db;

drop procedure if exists post_pub_publicacion;
drop procedure if exists put_pub_publicacion;
drop procedure if exists put_pub_visible;
drop procedure if exists put_pub_fecha;
drop procedure if exists delete_pub_publicacion;

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

create procedure delete_pub_publicacion( id int unsigned ) begin
	UPDATE PUBLICACION SET PUBLI_ACTIVA = 0 WHERE PUBLI_ID = id;
end;

$$