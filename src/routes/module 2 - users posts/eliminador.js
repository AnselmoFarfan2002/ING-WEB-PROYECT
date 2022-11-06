const { Router } = require('express');
const router = Router();

const {
    ELIMINAR_PUBLICACION
} = require( '../../controllers/module 2 - users posts/eliminador' );

router.route( '/publicaciones/gestor/:codigo' )
.delete( ELIMINAR_PUBLICACION )

module.exports = router;