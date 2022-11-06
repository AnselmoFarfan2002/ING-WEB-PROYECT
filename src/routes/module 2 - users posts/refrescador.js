const { Router } = require('express');
const router = Router();

const {
    REFRESCAR_PUBLICACION
} = require( '../../controllers/module 2 - users posts/refrescador' );

router.route( '/publicaciones/gestor/fecha/:codigo' ) 
.put( REFRESCAR_PUBLICACION )

module.exports = router;