use LOCAL_DB;

/*
-- drop TABLE if exists CATEGORIA;
CREATE TABLE CATEGORIA(
	CAT_ID tinyint unsigned zerofill auto_increment PRIMARY KEY,
    CAT_NOMBRE varchar(36) NOT NULL,
    CAT_SUPERIOR tinyint unsigned
);

-- drop TABLE if exists PUBLICACION;
-- 1: ok, venta
CREATE TABLE PUBLICACION(
	PUBLI_ID int unsigned zerofill auto_increment PRIMARY KEY,
    PUBLI_AUTOR int unsigned NOT NULL, -- fk    
    PUBLI_FECHA DATETIME NOT NULL,
    PUBLI_LAST_REFRESH DATETIME NOT NULL,
    PUBLI_TITULO varchar(100) NOT NULL,
    PUBLI_DESCRIPCION varchar(1000) NOT NULL,
    PUBLI_TIEMPO tinyint unsigned NOT NULL,
    PUBLI_FOTOS varchar(361) NOT NULL,
    PUBLI_PRECIO float NOT NULL,
    PUBLI_CATEGORIA tinyint unsigned NOT NULL, -- fk
    PUBLI_TIPO bool NOT NULL,
    PUBLI_NEGOCIABLE bool NOT NULL,
    PUBLI_VISIBLE bool NOT NULL DEFAULT 1 ,
    PUBLI_ACTIVA bool NOT NULL DEFAULT 1 ,
    
    foreign key(PUBLI_AUTOR) REFERENCES USUARIO(USU_ID),
    foreign key(PUBLI_CATEGORIA) REFERENCES CATEGORIA(CAT_ID)
);


-- Solo insertar una vez
INSERT INTO CATEGORIA (CAT_NOMBRE, CAT_SUPERIOR) VALUES 
	( 'Carnes y huevos', null ),
    ( 'Carnes rojas', 1 ),
    ( 'Carnes blancas', 1 ),
    ( 'Huevos', 1 ),
    ( 'Embutidos', 1 ),
    ( 'Pescados y mariscos', null ),
    ( 'Pescados', 6 ),
    ( 'Mariscos', 6 ),
    ( 'Vegetales y hortalizas', null ),
    ( 'Vegetales', 9 ),
    ( 'Hortalizas', 9 ),
    ( 'Pescados', 9 ),
    ( 'Frutas', null ),
    ( 'Dulces y semidulces', 13 ),
    ( 'Ácidas y semiácidas', 13 ),
    ( 'Lácteos y derivados', null ),
    ( 'Leche', 16 ),
    ( 'Yogures', 16 ),
    ( 'Quesos', 16 ),
    ( 'Otros', 16 ),
    ( 'Legumbres, tubérculos y frutos secos', null ),
    ( 'Legumbres', 21 ),
    ( 'Tubérculos', 21 ),
    ( 'Frutos secos', 21 ),
    ( 'Cereales y derivados', null ),
    ( 'Cereales', 25 ),
    ( 'Derivados', 25 );

*/
