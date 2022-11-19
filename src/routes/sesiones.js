const { Router } = require('express');
const router = Router();

const m1 = {}
m1.identificador = require( '../controllers/module 1 - users accounts/identificador' )
m1.editor = require('../controllers/module 1 - users accounts/editor-datos')

router.route( '/sesiones' )
.patch( m1.editor.ACTUALIZAR_CONTRASENIA )  
.post( m1.identificador.INICIAR_SESION )    
.delete( m1.identificador.CERRAR_SESION )            
.get( m1.identificador.RECUPERAR_CONTRASENIA )       

module.exports = router;