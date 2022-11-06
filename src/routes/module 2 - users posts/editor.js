const { Router } = require('express');
const router = Router();

const {
    EDITAR_PUBLICACION
} = require( '../../controllers/module 2 - users posts/editor' );

router.route( '/publicaciones/gestor/:codigo' )
.put( EDITAR_PUBLICACION )

module.exports = router;