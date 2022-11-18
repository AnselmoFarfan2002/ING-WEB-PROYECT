const { Router } = require('express');
const router = Router();

const { 
    INICIAR_SESION, 
    CERRAR_SESION,
    RECUPERAR_CONTRASENIA
} = require( '../controllers/module 1 - users accounts/identificador' )

const { ACTUALIZAR_CONTRASENIA } = require('../controllers/module 1 - users accounts/editor-datos')

router.route( '/sesiones' )
.patch( ACTUALIZAR_CONTRASENIA )    // MODULO 1 : EDITOR DATOS
.post( INICIAR_SESION )             // MODULO 1 : IDENTIFICADOR
.delete( CERRAR_SESION )            // MODULO 1 : IDENTIFICADOR
.get( RECUPERAR_CONTRASENIA )       // MODULO 1 : IDENTIFICADOR

module.exports = router;