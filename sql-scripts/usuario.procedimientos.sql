use LOCAL_DB;

drop procedure if exists get_usu_contrasenia;	-- obtiene la contraseña del usuario
drop procedure if exists post_emp_empresa;		-- registra una empresa
drop procedure if exists post_car_cargo;		-- registra un cargo
drop procedure if exists post_usu_usuario;		-- registra un usuario
drop procedure if exists put_usu_usuario;		-- actualiza datos de un usuario
drop procedure if exists put_usu_contrasenia;	-- actualiza la contraseña de un usuario
drop procedure if exists put_usu_photo;		-- actualiza foto de un usuario
drop procedure if exists put_emp_photo;		-- actualiza foto de una empresa
drop procedure if exists get_usu_usuario;		-- obtiene registro de un usuario desde el id
drop procedure if exists get_usu_usuario_byEmail;	-- obtiene registro de usuario desde el email

DELIMITER $$ 
create procedure get_usu_contrasenia( email varchar(40), keyword varchar(25) ) begin
	select cast( aes_decrypt( USU_CONTRASENIA, keyword ) as char ) as pass from USUARIO where USU_CORREO = email;
end;
$$

DELIMITER $$
create procedure post_emp_empresa( 
	EMP_RUC varchar(11),
	EMP_ENTIDAD varchar(30),
    EMP_UBICACION varchar(40),
    EMP_ROL_ENTIDAD varchar(20),
    EMP_FOTO varchar(200)
) begin
	INSERT INTO EMPRESA VALUES (EMP_RUC, EMP_ENTIDAD, EMP_UBICACION, EMP_ROL_ENTIDAD, EMP_FOTO);
end;
$$

DELIMITER $$
create procedure post_car_cargo( 
	idCargo tinyint unsigned ,
	CAR_NOMBRE varchar(20)
) begin
	INSERT INTO CARGO VALUES (idCargo, CAR_NOMBRE, 1);
end; $$

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
	INSERT INTO USUARIO 
		(USU_NOMBRE, USU_EMPRESA, USU_APELLIDO1, USU_APELLIDO2, USU_CARGO, USU_CORREO, USU_CELULAR, USU_TELEFONO, USU_CONTRASENIA, USU_FOTO)
		VALUES (USU_NOMBRE, USU_EMPRESA, USU_APELLIDO1, USU_APELLIDO2, USU_CARGO, USU_CORREO, USU_CELULAR, USU_TELEFONO, aes_encrypt(USU_CONTRASENIA, keyword), USU_FOTO);
end;
$$

DELIMITER $$
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
$$

DELIMITER $$
create procedure put_usu_contrasenia( userId int unsigned, pass varchar(16), keyword varchar(25) ) begin
	UPDATE USUARIO SET USU_CONTRASENIA = aes_encrypt( pass, keyword ) WHERE USU_ID = userId;
end;$$

DELIMITER $$
create procedure put_usu_photo( userId int unsigned, photo varchar(50) ) begin
	UPDATE USUARIO SET USU_FOTO = photo WHERE USU_ID = userId;
end;$$

DELIMITER $$
create procedure put_emp_photo( ruc varchar(11), photo varchar(50) ) begin
	UPDATE EMPRESA SET EMP_FOTO = photo WHERE EMP_RUC = ruc;
end;$$

DELIMITER $$
create procedure get_usu_usuario( userId int unsigned ) begin
	SELECT USU_ID as id, EMP_UBICACION as ubicacionEmpresa, EMP_ENTIDAD as nombreEmpresa, USU_EMPRESA as rucEmpresa, USU_TELEFONO as telefono, USU_CELULAR as celular, USU_NOMBRE as nombre, USU_APELLIDO1 as apellido1, USU_APELLIDO2 as apellido2, CAR_NOMBRE as cargo, USU_CORREO as correo, USU_FOTO as foto FROM USUARIO 
    JOIN CARGO ON USU_CARGO = CAR_ID
    JOIN EMPRESA ON USU_EMPRESA = EMP_RUC WHERE USU_ID = userID;
end;$$

DELIMITER $$
create procedure get_usu_usuario_byEmail( correo varchar(40) ) begin
	SELECT USU_ID as id, EMP_UBICACION as ubicacionEmpresa, EMP_ENTIDAD as nombreEmpresa, USU_EMPRESA as rucEmpresa, USU_TELEFONO as telefono, USU_CELULAR as celular, USU_NOMBRE as nombre, USU_APELLIDO1 as apellido1, USU_APELLIDO2 as apellido2, CAR_NOMBRE as cargo, USU_CORREO as correo, USU_FOTO as foto FROM USUARIO 
    JOIN CARGO ON USU_CARGO = CAR_ID
    JOIN EMPRESA ON USU_EMPRESA = EMP_RUC WHERE USU_CORREO = correo;
end;
$$