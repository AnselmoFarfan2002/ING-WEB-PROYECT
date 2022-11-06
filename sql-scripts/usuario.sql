use LOCAL_DB;

-- drop TABLE if exists EMPRESA;
CREATE TABLE EMPRESA(
	EMP_RUC varchar(11) PRIMARY KEY,
	EMP_ENTIDAD varchar(30) NOT NULL,
    EMP_UBICACION varchar(40) NOT NULL,
    EMP_ROL_ENTIDAD varchar(20) NOT NULL,
    EMP_FOTO varchar(200) NOT NULL
);

-- drop TABLE if exists CARGO;
CREATE TABLE CARGO(
	CAR_ID tinyint unsigned PRIMARY KEY,
	CAR_NOMBRE varchar(20),
    CAR_COMUNIDAD bool DEFAULT 1
);

-- drop TABLE if exists USUARIO;
CREATE TABLE USUARIO(
	USU_ID int unsigned zerofill auto_increment PRIMARY KEY,
    USU_EMPRESA varchar(11), -- fk     
	USU_TELEFONO varchar(7),
	USU_CELULAR varchar(13) NOT NULL,
    USU_NOMBRE varchar(30) NOT NULL,
    USU_APELLIDO1 varchar(30) NOT NULL,
    USU_APELLIDO2 varchar(30) NOT NULL,
    USU_CARGO tinyint unsigned NOT NULL, -- fk  
    USU_CORREO varchar(40) UNIQUE NOT NULL, 
    USU_CONTRASENIA blob NOT NULL,
    USU_FOTO varchar(200) NOT NULL,
    
	foreign key(USU_EMPRESA) REFERENCES EMPRESA(EMP_RUC),
    foreign key(USU_CARGO) REFERENCES CARGO(CAR_ID)
);

-- BITACORA DE CAMBIOS
/* 06-11-2022: 
	- Se cambia el atributo USU_CARGO a tinyint, ahora hace referencia a otra tabla llamada cargo. 
    - Se cambia el atributo USU_ID a int para el uso de auto_increment */
