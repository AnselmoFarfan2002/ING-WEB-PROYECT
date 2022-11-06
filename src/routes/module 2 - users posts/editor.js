const { Router } = require('express');
const router = Router();

const {
    EDITAR_DATOS_PUBLICACION,
    ALTERNAR_VISIBILIDAD_PUBLICACION,
    ACTUALIZAR_FOTOS_PUBLICACION
} = require( '../../controllers/module 2 - users posts/editor' );

router.route( '/publicaciones/gestor/datos/:codigo' )
.put( EDITAR_DATOS_PUBLICACION )

router.route( '/publicaciones/gestor/visible/:codigo' )
.put( ALTERNAR_VISIBILIDAD_PUBLICACION )

router.route( '/publicaciones/gestor/fotos/:codigo' )
.put( ACTUALIZAR_FOTOS_PUBLICACION )


module.exports = router;