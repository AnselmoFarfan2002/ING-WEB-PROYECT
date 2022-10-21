const { Router } = require('express');
const router = Router();

const multer = require('multer');
const uploader = multer({ 
    storage:    multer.diskStorage({
                    destination: ( req, file, cb ) => { cb(null, 'public/images/profile-photos'); },
                    filename:    ( req, file, cb ) => { cb(null, 'photo-' + req.session.ruc + '.png' ); },
                }),

    fileFilter: ( req, file, cb ) => { cb( null, file.mimetype.startsWith( 'image/' ) ); },
});

const {
    ACTUALIZAR_FOTO_PERFIL,
    ACTUALIZAR_DATOS,
    ACTUALIZAR_CONTRASENIA
} = require( '../../controllers/module 1 - users accounts/edit-info' );

router.route( '/usuario/editar-perfil' )
.post( uploader.single('profile-photo'), ACTUALIZAR_FOTO_PERFIL )
.put( ACTUALIZAR_DATOS );

router.route( '/usuario/editar-contrasenia' )
.post( ACTUALIZAR_CONTRASENIA );

module.exports = router;