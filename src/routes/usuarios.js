const { Router } = require('express');
const multer = require( 'multer' );

const router = Router();

const uploader = multer({ 
    storage:    multer.diskStorage({
                    destination: ( req, file, cb ) => { cb(null, 'public/images/profile-photos'); },
                    filename:    ( req, file, cb ) => { cb(null, 'photo-' + req.session.userId + '.png' ); },
                }),

    fileFilter: ( req, file, cb ) => { cb( null, file.mimetype.startsWith( 'image/' ) ); },
});

const {
    ACTUALIZAR_FOTO_PERFIL,
    ACTUALIZAR_DATOS
} = require( '../controllers/module 1 - users accounts/editor-datos' );

const { REGISTRAR_CUENTA } = require( '../controllers/module 1 - users accounts/registrador' )

router.route( '/usuarios' )
.post( REGISTRAR_CUENTA )   // MODULO 1 : REGISTRADOR
.patch( uploader.single('profile-photo'), ACTUALIZAR_FOTO_PERFIL )  // MODULO 1 : EDITOR DATOS
.put( ACTUALIZAR_DATOS );                                           // MODULO 1 : EDITOR DATOS

module.exports = router;