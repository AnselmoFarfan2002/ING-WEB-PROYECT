const { Router } = require('express');
const router = Router();

const {
    INICIAR_SESION, 
    CERRAR_SESION,
    RECUPERAR_CONTRASENIA
} = require( '../../controllers/module 1 - users accounts/identificador' )

router.route( '/inicio-sesion' )
.post( INICIAR_SESION )
.delete( CERRAR_SESION );

router.route( '/recuperar-contrasenia' )
.post( RECUPERAR_CONTRASENIA );

module.exports = router;
