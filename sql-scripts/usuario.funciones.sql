use LOCAL_DB;

-- SET GLOBAL log_bin_trust_function_creators = 1;
drop function if exists validar_credenciales;
drop function if exists validar_registro;

DELIMITER $$ 
create function validar_credenciales( email varchar(40), pass varchar(16), keyword varchar(25) ) returns tinyint begin
	-- not found: -1 
    -- wrong pass: 0
    -- successful: 1
    
	if ( select COUNT( USU_RUC ) from USUARIO where USU_CORREO = email ) > 0 then
		return ( select COUNT( USU_RUC ) from USUARIO where USU_CORREO = email and pass = aes_decrypt( USU_CONTRASENIA, keyword ) );
	else 
		return -1;
    end if;
end;

DELIMITER $$ 
create function validar_registro(email varchar(40), ruc varchar(11)) returns tinyint begin
	-- failure: -1 
    -- successful: 1
    
	if (select count(USU_RUC) from USUARIO where USU_RUC = ruc or UCASE(USU_CORREO) = UCASE(email)) > 0 then
		return -1;
	else 
		return 1;
    end if;
end;

-- select validar_registro('jamesrod19@gmail.com','09876543121');

-- delete from USUARIO where USU_RUC = 01234567891;
-- call post_usu_usuario('01234567891','TakanaSoft','Tacna','Desarrolladora','Anselmo Farfan','Jefe de Área','anselmofarfan2002@gmail.com','+51 984532631','','ASDasd123','unFzhzuOxruQMAjKavux59cF4');

-- call get_usu_contrasenia('anselmofarfan2002@gmail.com','unFzhzuOxruQMAjKavux59cF4')

$$