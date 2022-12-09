use LOCAL_DB;

-- drop TABLE if exists CHAT;
CREATE TABLE CHAT(
	CHAT_ID bigint unsigned zerofill auto_increment PRIMARY KEY,
    CHAT_PUBLICACION int unsigned,
	foreign key(CHAT_PUBLICACION) REFERENCES PUBLICACION(PUBLI_ID),
    
    CHAT_ULTIMA_ACTIVIDAD datetime,
    CHAT_USUARIOS_ACTIVOS tinyint NOT NULL
);

-- drop TABLE if exists INTERACCION;
CREATE TABLE INTERACCION(
	INT_CHAT int unsigned,
	foreign key(INT_CHAT) REFERENCES CHAT(CHAT_ID),
    
    INT_USUARIO int unsigned NOT NULL,
	foreign key(INT_USUARIO) REFERENCES USUARIO(USU_ID),

	primary key(INT_CHAT, INT_USUARIO),

    INT_VISIBLE bool NOT NULL,
    INT_NOTIFICACION bool NOT NULL
);

-- BITACORA DE CAMBIOS
/* 06-11-2022: 
	- Se cambia el atributo CHAT_ACTIVIDAD a datetime, se encontraba mal implementado.
    - Se cambie el nombre del atributo CHAT_VISIBILIDAD por CHAT_USUARIOS_ACTIVOS para mejor legibilidad
    - Se elimina el atributo CHAT_FICHERO, el nombre es la combinación del idChat e idPublicacion, se elimina redundancia
*/
