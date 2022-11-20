const { Router } = require('express');
const multer = require( 'multer' );

const router = Router();

const uploader_ = multer({ 
    storage:    multer.diskStorage({
                    destination: ( req, file, cb ) => { cb(null, 'views/images/business-photos'); },
                    filename:    ( req, file, cb ) => { cb(null, 'photo-' + req.session.empresa + '.png' ); },
                }),

    fileFilter: ( req, file, cb ) => { cb( null, file.mimetype.startsWith( 'image/' ) ); },
});

const editor = require( '../controllers/module 1 - users accounts/editor-datos' );

router.route( '/empresas' )
.patch( uploader_.single('business-photo'), editor.ACTUALIZAR_FOTO_EMPRESA )   // MODULO 1 : EDITOR DATOS

module.exports = router;