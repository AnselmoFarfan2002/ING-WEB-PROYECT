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
    CREAR_PUBLICACION
} = require('../../controllers/module 2 - users posts/creador');

router.route( '/publicaciones/gestor' )
.post( uploader.array('photos', 12), CREAR_PUBLICACION )

module.exports = router;