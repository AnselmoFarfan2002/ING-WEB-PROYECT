use LOCAL_DB;

/*
-- drop TABLE if exists CHAT;
CREATE TABLE CHAT(
	CHAT_ID varchar(11) PRIMARY KEY,
    CHAT_PUBLICACION varchar(11),
	foreign key(CHAT_PUBLICACION) REFERENCES PUBLICACION(PUBLI_ID),

    CHAT_FICHERO varchar(30) NOT NULL,
    CHAT_ACTIVIDAD bool NOT NULL,
    CHAT_VISIBILIDAD bool NOT NULL
);

-- drop TABLE if exists INTERACCION;
CREATE TABLE INTERACCION(
	INT_CHAT varchar(11) NOT NULL,
	foreign key(INT_CHAT) REFERENCES CHAT(CHAT_ID),
    
    INT_USUARIO varchar(11) NOT NULL,
	foreign key(INT_USUARIO) REFERENCES USUARIO(USU_ID),

    INT_VISIBLE bool NOT NULL
);
*/