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

const m2 = {};
m2.creador  = require('../controllers/module 2 - users posts/creador');
m2.editor   = require( '../controllers/module 2 - users posts/editor' );
m2.eliminador   = require( '../controllers/module 2 - users posts/eliminador' );
m2.refrescador  = require( '../controllers/module 2 - users posts/refrescador' );

router.route( '/publicaciones' )
//.get -> ?i=0&n=5 mirar generalemente varios de i->n
.post( uploader.array('photos', 12), m2.creador.CREAR_PUBLICACION )  

router.route( '/publicaciones/:id' )
// get -> mirar detalladamente 1
.put( m2.editor.EDITAR_DATOS_PUBLICACION )        
.delete( m2.eliminador.ELIMINAR_PUBLICACION )     

router.route( '/publicaciones/:id/tiempo' )      .put( m2.refrescador.REFRESCAR_PUBLICACION )          
router.route( '/publicaciones/:id/visibilidad' ) .patch( m2.editor.ALTERNAR_VISIBILIDAD_PUBLICACION )  

router.route( '/publicaciones/:id/fotos' )      
.patch( uploader.array('photos', 12), m2.editor.ACTUALIZAR_FOTOS_PUBLICACION )      

module.exports = router;