const { Router } = require('express');
const multer = require( 'multer' );

const router = Router();

const uploader = multer({ 
    storage:    
        multer.diskStorage({
            destination: ( req, file, cb ) => { cb(null, 'public/images/posts-photos'); },
            filename:    ( req, file, cb ) => { cb(null, Date.now() + '-' + + Math.round(Math.random() * 1E9) + '.png' ); },
        }),

    fileFilter: 
        ( req, file, cb ) => { cb( null, file.mimetype.startsWith( 'image/' ) ); },
});

const { CREAR_PUBLICACION } = require('../controllers/module 2 - users posts/creador');
const { ELIMINAR_PUBLICACION } = require( '../controllers/module 2 - users posts/eliminador' );
const { REFRESCAR_PUBLICACION } = require( '../controllers/module 2 - users posts/refrescador' );

const {
    EDITAR_DATOS_PUBLICACION,
    ALTERNAR_VISIBILIDAD_PUBLICACION,
    ACTUALIZAR_FOTOS_PUBLICACION
} = require( '../controllers/module 2 - users posts/editor' );

// MODULO 2 : CREADOR

router.route( '/publicaciones' )
.post( uploader.array('photos', 12), CREAR_PUBLICACION )    // MODULO 2 : CREADOR

router.route( '/publicaciones/:id' )
.put( EDITAR_DATOS_PUBLICACION )        // MODULO 2 : EDITOR
.delete( ELIMINAR_PUBLICACION )         // MODULO 2 : ELIMINADOR

router.route( '/publicaciones/:id/visibilidad' ) .patch( ALTERNAR_VISIBILIDAD_PUBLICACION )  // MODULO 2 : EDITOR
router.route( '/publicaciones/:id/fotos' )       .patch( ACTUALIZAR_FOTOS_PUBLICACION )      // MODULO 2 : EDITOR
router.route( '/publicaciones/:id/fotos' )       .put( REFRESCAR_PUBLICACION )               // MODULO 2 : REFRESCADOR


module.exports = router;