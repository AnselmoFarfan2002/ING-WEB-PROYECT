use LOCAL_DB;

-- SET GLOBAL log_bin_trust_function_creators = 1;
drop function if exists validar_credenciales;
drop function if exists validar_registro;
drop function if exists get_emp_ruc;

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

DELIMITER $$ 
create function validar_registro(email varchar(40), ruc varchar(11)) returns tinyint begin
	-- failure: -1 
    -- successful: 1
    
	if (select count(EMP_RUC) from EMPRESA where EMP_RUC = ruc) > 0 then
		if (select count(USU_CORREO) from USUARIO where UCASE(USU_CORREO) = UCASE(email)) > 0 then
			return -1;
		else 
			return 1;
		end if;
	else
		return 1;
    end if;
end;
 -- select validar_registro('jamesrod19@gmail.com','09876543121');
 
DELIMITER $$
create function get_emp_ruc() returns varchar(11) begin
    return (select EMP_RUC FROM EMPRESA ORDER BY EMP_RUC DESC LIMIT 1);
end$$

/* ----------------------------------------------------------------------------------- */
drop procedure if exists get_usu_contrasenia;
drop procedure if exists post_emp_empresa;
drop procedure if exists post_usu_usuario;

DELIMITER $$
create procedure get_usu_contrasenia( email varchar(40), keyword varchar(25) ) begin
	select cast( aes_decrypt( USU_CONTRASENIA, keyword ) as char ) as pass from USUARIO where USU_CORREO = email;
end$$

DELIMITER $$
create procedure post_emp_empresa( 
	EMP_RUC varchar(11),
	EMP_ENTIDAD varchar(30),
    EMP_UBICACION varchar(40),
    EMP_ROL_ENTIDAD varchar(20),
    EMP_FOTO varchar(200)
) begin
	INSERT INTO EMPRESA VALUES (EMP_RUC, EMP_ENTIDAD, EMP_UBICACION, EMP_ROL_ENTIDAD, EMP_FOTO);
end$$

DELIMITER $$
create procedure post_usu_usuario( 
    USU_NOMBRE varchar(30),
    USU_EMPRESA varchar(11),
    USU_APELLIDO1 varchar(30),
    USU_APELLIDO2 varchar(30),
    USU_CARGO varchar(20),
    USU_CORREO varchar(40),
    USU_CELULAR varchar(13),
    USU_TELEFONO varchar(7),
    USU_CONTRASENIA blob,
    keyword varchar(25),
    USU_FOTO varchar(200)
) begin
	INSERT INTO USUARIO (USU_NOMBRE, USU_EMPRESA, USU_APELLIDO1, USU_APELLIDO2, USU_CARGO, USU_CORREO, USU_CELULAR, USU_TELEFONO, USU_CONTRASENIA, USU_FOTO) VALUES (USU_NOMBRE, USU_EMPRESA, USU_APELLIDO1, USU_APELLIDO2, USU_CARGO, UPPER(USU_CORREO), USU_CELULAR, USU_TELEFONO, aes_encrypt(USU_CONTRASENIA, keyword), USU_FOTO);
end$$

-- delete from USUARIO where USU_RUC = 01234567891;
-- call post_usu_usuario('01234567891','TakanaSoft','Tacna','Desarrolladora','Anselmo Farfan','Jefe de Área','anselmofarfan2002@gmail.com','984532631','','ASDasd123','unFzhzuOxruQMAjKavux59cF4');

-- call get_usu_contrasenia('anselmofarfan2002@gmail.com','unFzhzuOxruQMAjKavux59cF4')

$$