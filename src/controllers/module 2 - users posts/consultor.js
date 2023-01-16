const mysqlConnection = require( '../../config/db-connection' );
const controllers = {};

controllers.OBTENER_DATOS_PUBLICACION = (req, res) => {
    if( req.query.id ){
        mysqlConnection.query('call get_pub_publicacion(?)', req.query.id, (err, rows) => {
            if( err ) {
                console.log(err); 
            }
            else res.send({...rows[0][0]})
        });
    } else controllers.LISTAR_PUBLICACION(req, res);
}

controllers.OBTENER_CATEGORIAS = (req, res) => {
    mysqlConnection.query('SELECT CAT_ID AS id, CAT_NOMBRE AS nombre, CAT_SUPERIOR AS categoriaSuperior FROM CATEGORIA', (err, rows) => {
        if( err ) console.log(err); 
        else res.send({...rows})
    });
}

controllers.LISTAR_PUBLICACION = (req, res) => { 
    let userQuery = `SELECT 
        PUBLI_ID AS id, 
        concat(USU_NOMBRE,' ',USU_APELLIDO1,' ',USU_APELLIDO2) AS autor, 
        PUBLI_FECHA as fecha, CAT_NOMBRE as categoria, CAT_SUPERIOR as categoriaSuperior, 
        PUBLI_TITULO as titulo, 
        PUBLI_PRECIO as precio, 
        PUBLI_VISIBLE as visible, 
        PUBLI_NEGOCIABLE as negociable, 
        PUBLI_FOTOS as fotos `;
    userQuery += ` FROM PUBLICACION JOIN USUARIO ON USU_ID = PUBLI_AUTOR JOIN CATEGORIA ON PUBLI_CATEGORIA = CAT_ID `;

    let filters = [];
    let values = [];
    if(req.query.idAutor){ 
        filters.push('PUBLI_AUTOR'); 
        values.push(req.query.idAutor); }
    else if(req.query.self == true){ 
        filters.push('PUBLI_AUTOR'); 
        values.push(req.session.userId); }

    if(req.query.precio){ 
        filters.push('PUBLI_PRECIO'); 
        values.push(req.query.precio); }        
    if(req.query.negociable){ 
        filters.push('PUBLI_NEGOCIABLE'); 
        values.push(req.query.negociable); }        
    if(req.query.categoria){ 
        filters.push('PUBLI_CATEGORIA'); 
        values.push(req.query.categoria); }        
    
    if(filters.length > 0){ 
        userQuery += ` WHERE`;
        filters.forEach((e, i) => {userQuery += ` ${e} = ? `; if(i < filters.length - 1) userQuery += 'AND';});
        userQuery = mysqlConnection.format(userQuery, values);
    }

    if(req.query.self == false){ userQuery += ` AND PUBLI_AUTOR != ${req.session.userId} `; }

    if(req.query.fecha){ 
        userQuery += ` AND DATE(PUBLI_FECHA) = ? `;  
        userQuery = mysqlConnection.format(userQuery, req.query.fecha);
    }    

    if(req.query.titulo) userQuery += ` AND PUBLI_TITULO LIKE '%${req.query.titulo}%' `;  
    if(req.query.autor) userQuery += ` AND concat(USU_NOMBRE,' ',USU_APELLIDO1,' ',USU_APELLIDO2) LIKE '%${req.query.autor}%' `;
    
    userQuery += `AND PUBLI_ACTIVA = true`
    
    if(req.query.fechaDesc == true || req.query.fechaDesc == 'true' || req.query.fechaDesc == 'TRUE') userQuery += ' ORDER BY PUBLI_FECHA DESC ';
    else userQuery += ' ORDER BY PUBLI_FECHA ASC ';

    if(!isNaN(req.query.desdeFila) || !isNaN(req.query.nFilas)){
        if(!isNaN(req.query.desdeFila) && !isNaN(req.query.nFilas)){
            userQuery += ` LIMIT ${req.query.desdeFila}, ${req.query.nFilas} `;
        } else if(!isNaN(req.query.nFilas)) userQuery += ` LIMIT ${req.query.nFilas} `; 
    } 

    mysqlConnection.query(userQuery, (err, rows, info) => {
        if (err) {
            console.log(err);
            res.send({ msg: 'Solicitud inválida', status: -1 } )
        } else res.send(rows);
    })
}

module.exports = controllers;

