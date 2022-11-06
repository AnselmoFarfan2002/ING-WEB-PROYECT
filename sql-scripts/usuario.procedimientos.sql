DELIMITER $$ 
/* ----------------------------------------------------------------------------------- */
drop procedure if exists get_usu_contrasenia;
drop procedure if exists post_usu_usuario;
drop procedure if exists put_usu_usuario;
drop procedure if exists put_usu_contrasenia;

create procedure get_usu_contrasenia( email varchar(40), keyword varchar(25) ) begin
	select cast( aes_decrypt( USU_CONTRASENIA, keyword ) as char ) as pass from USUARIO where USU_CORREO = email;
end;

create procedure post_usu_usuario( 
	USU_RUC varchar(11),
	USU_ENTIDAD varchar(30),
    USU_UBICACION varchar(40),
    USU_ROL_ENTIDAD varchar(20),
    USU_NOMBRE varchar(30),
    USU_ROL_PERSONA varchar(20),
    USU_CORREO varchar(40),
    USU_CELULAR varchar(13),
    USU_TELEFONO varchar(7),
    USU_CONTRASENIA blob,
    keyword varchar(25)
) begin
	INSERT INTO USUARIO VALUES ( USU_RUC, USU_ENTIDAD, USU_UBICACION, USU_ROL_ENTIDAD, USU_NOMBRE, USU_ROL_PERSONA, USU_CORREO, USU_CELULAR, USU_TELEFONO, aes_encrypt(USU_CONTRASENIA, keyword) );
end;

create procedure put_usu_usuario(
	ruc varchar(11),
	entidad varchar(30),
    ubicacion varchar(40),
    rolen varchar(20),
    nombre varchar(30),
    rolpe varchar(20),
    email varchar(40),
    celular varchar(13),
    telefono varchar(7)
)begin
	UPDATE USUARIO SET
		USU_ENTIDAD = entidad,
		USU_UBICACION = ubicacion,
		USU_ROL_ENTIDAD = rolen,
		USU_NOMBRE = nombre,
		USU_ROL_PERSONA = rolpe,
		USU_CORREO = email,
		USU_CELULAR = celular,
		USU_TELEFONO = telefono
	WHERE USU_RUC = ruc;
end;

create procedure put_usu_contrasenia( email varchar(40), pass varchar(16), keyword varchar(25) ) begin
	UPDATE USUARIO SET USU_CONTRASENIA = aes_encrypt( pass, keyword ) WHERE USU_CORREO = email;
end;

$$ 