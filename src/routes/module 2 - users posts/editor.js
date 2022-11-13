const { Router } = require('express');
const router = Router();

const multer = require( 'multer' );
const uploader = multer({ 
    storage:    multer.diskStorage({
                    destination: ( req, file, cb ) => { cb(null, 'public/images/posts-photos'); },
                    filename:    ( req, file, cb ) => { cb(null, Date.now() + '-' + + Math.round(Math.random() * 1E9) + '.png' ); },
                }),

    fileFilter: ( req, file, cb ) => { cb( null, file.mimetype.startsWith( 'image/' ) ); },
});

const {
    EDITAR_DATOS_PUBLICACION,
    ALTERNAR_VISIBILIDAD_PUBLICACION,
    ACTUALIZAR_FOTOS_PUBLICACION
} = require( '../../controllers/module 2 - users posts/editor' );

router.route( '/publicaciones/gestor/datos/:codigo' )
.put( EDITAR_DATOS_PUBLICACION )

router.route( '/publicaciones/gestor/visible/:codigo' )
.put( ALTERNAR_VISIBILIDAD_PUBLICACION )

router.route( '/publicaciones/gestor/fotos/:codigo' )
.put( uploader.array('photos', 12), ACTUALIZAR_FOTOS_PUBLICACION )


module.exports = router;