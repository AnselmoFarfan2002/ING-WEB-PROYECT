use LOCAL_DB;

-- SET GLOBAL log_bin_trust_function_creators = 1;
drop function if exists validar_credenciales;

DELIMITER $$ 
create function validar_credenciales( email varchar(40), pass varchar(40), keyword varchar(25) ) returns tinyint begin
	-- not found: -1 
    -- wrong pass: 0
    -- successful: 1
    
	if ( select COUNT( USU_RUC ) from USUARIO where USU_CORREO = email ) > 0 then
		return ( select COUNT( USU_RUC ) from USUARIO where USU_CORREO = email and pass = aes_decrypt( USU_CONTRASENIA, keyword ) );
	else 
		return -1;
    end if;
end;

/* ----------------------------------------------------------------------------------- */
drop procedure if exists get_usu_contrasenia;
drop procedure if exists post_usu_usuario;

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

-- delete from USUARIO where USU_RUC = 01234567891;
-- call post_usu_usuario('01234567891','TakanaSoft','Tacna','Desarrolladora','Anselmo Farfan','Jefe de Área','anselmofarfan2002@gmail.com','+51 984532631','','ASDasd123','unFzhzuOxruQMAjKavux59cF4');

-- call get_usu_contrasenia('anselmofarfan2002@gmail.com','unFzhzuOxruQMAjKavux59cF4')

$$