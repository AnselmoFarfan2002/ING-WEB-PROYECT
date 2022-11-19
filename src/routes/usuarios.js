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

const m1 = {};
m1.editor = require( '../controllers/module 1 - users accounts/editor-datos' )
m1.registrador = require( '../controllers/module 1 - users accounts/registrador' )
m1.consultor = require( '../controllers/module 1 - users accounts/consultor' )

router.route( '/usuarios' )
.get( m1.consultor.OBTENER_DATOS )
.post( m1.registrador.REGISTRAR_CUENTA )   
.patch( uploader.single('profile-photo'), m1.editor.ACTUALIZAR_FOTO_PERFIL )  
.put( m1.editor.ACTUALIZAR_DATOS );                                         

module.exports = router;