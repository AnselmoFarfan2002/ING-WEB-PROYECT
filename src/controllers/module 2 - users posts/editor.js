const { json } = require("express");
const mysqlConnection = require("../../config/db-connection");
const fs = require("fs");
const controllers = {}

controllers.EDITAR_DATOS_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){
        let query = mysqlConnection.format( 'call put_pub_publicacion(?,?,?,?,?,?)', [
            req.params.codigo,
            req.body.titulo,
            req.body.descripcion,
            req.body.precio,
            req.body.categoria,
            req.body.negociable
        ]);

        mysqlConnection.query(query, (err,rows) => new Promise((resolve, reject) => {
            if( err ) reject({ msg: 'Ha ocurrido un error al editar la publicación.', status: -1, error: err });
            else resolve({ msg: 'Edición exitosa.', status: 1 });

        }).then( resultado => res.send( resultado ) )
        .catch( resultado => {
            res.send({ msg: resultado.msg, status: resultado.status });
            console.log( resultado.error );
        }))
        
    } else res.send( { msg: 'u need an open session to do that...', status: -1 } ); 
}

controllers.ALTERNAR_VISIBILIDAD_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){
        let query = mysqlConnection.format( 'call put_pub_visible(?)', req.params.codigo );
        mysqlConnection.query(query, (err,rows) => new Promise((resolve, reject) => {
            if( err ) reject({ msg: 'Ha ocurrido un error al ocultar la publicación.', status: -1, error: err });
            else resolve({ msg: 'Se ha cambiado la visibilidad de su publicación.', status: 1 });

        }).then( resultado => res.send( resultado ) )
        .catch( resultado => {
            res.send({ msg: resultado.msg, status: resultado.status });
            console.log( resultado.error );
        }))
        
    } else res.send( { msg: 'u need an open session to do that...', status: -1 } ); 
}

controllers.ACTUALIZAR_FOTOS_PUBLICACION = (req, res) => {
    if ( req.session.open === true ){        
        let query = 'call put_pub_fotos(?,?)'; //Llamada de procedimiento para actualizar foto

        req.body.fotos = []; //Array para guardar nombre de fotos
        req.files.forEach(element => { req.body.fotos.push(element.filename) }); //Se inserta los nombres de las nuevas fotos
        req.body.fotos = JSON.stringify( req.body.fotos ); //Se transforma a formato JSON

        query = mysqlConnection.format(query, [
            req.params.codigo, 
            req.body.fotos
        ]);

        mysqlConnection.query("SELECT PUBLI_FOTOS FROM PUBLICACION WHERE PUBLI_ID = ?", req.params.codigo, (err,rows) =>{
            let result = rows[0].PUBLI_FOTOS.slice(1,-1); //Se desplaza un caracter hacia adelante y atras en el resultado de la consulta para obviar los "[]"
            var result_split = result.split(","); //Se separa el array cuando se detecta una coma

            files = fs.readdirSync("public/images/posts-photos"); //Se lee el directorio de las imagenes
            
            for(i=0;i<files.length;i++){ //Bucle desde 0 hasta el total de imagenes de la carpeta
                if(files.filename = result_split[i]){ //Si el nombre de los archivos de la carpeta es igual al nombre de los resultados...
                    fs.unlinkSync(`public/images/posts-photos/${result_split[i].replace(/[""]+/g,'')}`); //Se elimina la foto antigua
                }
            }
        });

        mysqlConnection.query(query, (err,rows) => new Promise((resolve, reject) => { //Se llama al query que actualiza el nombre de fotos en la BD
            if(err){
                reject({ msg: 'Ha ocurrido un error al editar las fotos.', status: -1, error: err }); //En caso de error
            }
            else {
                resolve({ msg: 'Edición exitosa.', status: 1 }); //Se realiza la edicion
            }
        })
        .then( resp => res.send(resp) )
        .catch( resp => {
            res.send({ msg: resp.msg, status: resp.status });
            console.log( resp.error );
        }))

    }else res.send( { msg: 'No se ha iniciado sesion...', status: -1 } ); 
}

module.exports = controllers;