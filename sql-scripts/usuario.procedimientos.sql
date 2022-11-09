use LOCAL_DB;

DELIMITER $$ 
drop procedure if exists get_usu_contrasenia;	-- obtiene la contraseña del usuario
drop procedure if exists post_emp_empresa;		-- registra una empresa
drop procedure if exists post_car_cargo;		-- registra un cargo
drop procedure if exists post_usu_usuario;		-- registra un usuario
drop procedure if exists put_usu_usuario;		-- actualiza datos de un usuario
drop procedure if exists put_usu_contrasenia;	-- actualiza la contraseña de un usuario

create procedure get_usu_contrasenia( email varchar(40), keyword varchar(25) ) begin
	select cast( aes_decrypt( USU_CONTRASENIA, keyword ) as char ) as pass from USUARIO where USU_CORREO = email;
end;

create procedure post_emp_empresa( 
	EMP_RUC varchar(11),
	EMP_ENTIDAD varchar(30),
    EMP_UBICACION varchar(40),
    EMP_ROL_ENTIDAD varchar(20),
    EMP_FOTO varchar(200)
) begin
	INSERT INTO EMPRESA VALUES (EMP_RUC, EMP_ENTIDAD, EMP_UBICACION, EMP_ROL_ENTIDAD, EMP_FOTO);
end;

create procedure post_car_cargo( 
	CAR_NOMBRE varchar(20)
) begin
	INSERT INTO CARGO (CAR_NOMBRE) VALUES (CAR_NOMBRE);
end;

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
	INSERT INTO USUARIO 
		(USU_NOMBRE, USU_EMPRESA, USU_APELLIDO1, USU_APELLIDO2, USU_CARGO, USU_CORREO, USU_CELULAR, USU_TELEFONO, USU_CONTRASENIA, USU_FOTO)
		VALUES (USU_NOMBRE, USU_EMPRESA, USU_APELLIDO1, USU_APELLIDO2, USU_CARGO, USU_CORREO, USU_CELULAR, USU_TELEFONO, aes_encrypt(USU_CONTRASENIA, keyword), USU_FOTO);
end;

create procedure put_usu_usuario(
	_NOMBRE varchar(30),
    _APELLIDO1 varchar(30),
    _APELLIDO2 varchar(30),
    _CARGO varchar(20),
    _CORREO varchar(40),
    _ID int unsigned,
    _CELULAR varchar(13),
    _TELEFONO varchar(7)
)begin
	UPDATE USUARIO SET
		USU_NOMBRE 		= _NOMBRE,
		USU_APELLIDO1 	= _APELLIDO1,
		USU_APELLIDO2	= _APELLIDO2,
		USU_CARGO		= _CARGO,
		USU_CORREO 		= _CORREO,
		USU_CELULAR 	= _CELULAR,
		USU_TELEFONO 	= _TELEFONO
	WHERE USU_ID = _ID;
end;

create procedure put_usu_contrasenia( userId int unsigned, pass varchar(16), keyword varchar(25) ) begin
	UPDATE USUARIO SET USU_CONTRASENIA = aes_encrypt( pass, keyword ) WHERE USU_ID = userId;
end;

$$ 